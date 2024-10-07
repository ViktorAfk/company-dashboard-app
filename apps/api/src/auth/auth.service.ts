import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  async generateAccessToken(userId: number, email: string) {
    const payload = { sub: userId, email };

    return this.jwtService.signAsync(payload, {
      expiresIn: 60 * 15 * 1000,
      secret: jwtSecret,
    });
  }

  async generateRefreshToken(userId: number, email: string) {
    const payload = { sub: userId, email };

    return this.jwtService.signAsync(payload, {
      expiresIn: 60 * 60 * 24 * 1000,
      secret: jwtSecret,
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

    const accessToken = await this.generateAccessToken(user.id, user.email);
    const refreshToken = await this.generateRefreshToken(user.id, user.email);

    await this.tokensService.save(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      name: `${user.name} ${user.surname}`,
      userId: user.id,
    };
  }

  async logout(userId: number) {
    return this.tokensService.remove(userId);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    const rfToken = await this.tokensService.findOne(userId);

    if (!user || !rfToken) {
      throw new ForbiddenException('Access denied');
    }

    const isRfTokensMatches = bcrypt.compare(refreshToken, refreshToken);

    if (!isRfTokensMatches) {
      throw new ForbiddenException('Access denied');
    }

    const newRfToken = await this.generateRefreshToken(user.id, user.email);
    const newAccessToken = await this.generateAccessToken(user.id, user.email);

    return {
      accessToken: newAccessToken,
      refreshToken: newRfToken,
    };
  }
}
