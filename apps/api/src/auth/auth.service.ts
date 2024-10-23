import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from 'src/config/app-config.service';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokensService: TokensService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async generateAccessToken(userId: number, email: string, role: Role) {
    const payload = { sub: userId, email, role };

    return this.jwtService.sign(payload, {
      expiresIn: 1000 * 15 * 60,
      secret: this.appConfigService.JwtSecret,
    });
  }

  async generateRefreshToken(userId: number, email: string, role: Role) {
    const payload = { sub: userId, email, role };

    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.appConfigService.JwtRefreshSecret,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(
        `No user found for email: ${email} or invalid password`,
      );
    }

    const isPasswordValid = bcrypt.compare(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        `No user found for email: ${email} or invalid password`,
      );
    }

    const accessToken = await this.generateAccessToken(
      user.id,
      user.email,
      user.role,
    );
    const refreshToken = await this.generateRefreshToken(
      user.id,
      user.email,
      user.role,
    );

    await this.tokensService.save(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      name: `${user.name} ${user.surname}`,
      userId: user.id,
    };
  }

  async register(input: {
    name: string;
    email: string;
    password: string;
    role: Role;
    surname: string;
  }) {
    const isUserExists = await this.userService.findByEmail(input.email);

    if (isUserExists) {
      throw new BadRequestException('User already exists');
    }
    const newUser = {
      ...input,
      avatar: null,
    };
    return this.userService.create(newUser);
  }

  async logout(userId: number) {
    const isTokenExist = await this.tokensService.findOne(userId);
    if (!isTokenExist) {
      throw new UnauthorizedException('Access denied');
    }
    return this.tokensService.remove(userId);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    const rfToken = await this.tokensService.findOne(userId);

    if (!user || !rfToken) {
      throw new ForbiddenException('Access denied');
    }

    const isRfTokensMatches = bcrypt.compare(
      rfToken.refreshToken,
      refreshToken,
    );

    if (!isRfTokensMatches) {
      throw new ForbiddenException('Access denied');
    }

    const newRfToken = await this.generateRefreshToken(
      user.id,
      user.email,
      user.role,
    );

    const newAccessToken = await this.generateAccessToken(
      user.id,
      user.email,
      user.role,
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRfToken,
    };
  }
}
