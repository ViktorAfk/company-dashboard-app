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
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';

export const jwtSecret = process.env.JWT_SECRET;
export const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokensService: TokensService,
  ) {}

  async generateAccessToken(userId: number, email: string, role: Role) {
    const payload = { sub: userId, email, role };

    return this.jwtService.sign(payload, {
      expiresIn: 60 * 15 * 1000,
      secret: jwtSecret,
    });
  }

  async generateRefreshToken(userId: number, email: string, role: Role) {
    const payload = { sub: userId, email, role };

    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: jwtRefreshSecret,
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
    return this.userService.create(input);
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
