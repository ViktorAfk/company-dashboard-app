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
import { EmailService } from 'src/email/email.service';
import { ResetTokenService } from 'src/reset-token/reset-token.service';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokensService: TokensService,
    private readonly appConfigService: AppConfigService,
    private readonly resetTokenService: ResetTokenService,
    private readonly emailService: EmailService,
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
    console.log(user);

    if (!user) {
      throw new NotFoundException(
        `No user found for email: ${email} or invalid password`,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

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
      fullName: `${user.name} ${user.surname}`,
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

  async resetPassword(resetToken: string, newPassword: string) {
    try {
      const token = await this.resetTokenService.find(resetToken);

      if (!token) {
        throw new NotFoundException('No reset tokens found. Invalid link');
      }
      const isExpired = token.expiryDate < new Date();
      if (isExpired) {
        throw new UnauthorizedException('Token is expired');
      }

      const user = await this.userService.findOne(token.userId);

      if (!user) {
        throw new NotFoundException('No user found');
      }

      await this.userService.resetUserPassword(user.id, newPassword);
      await this.resetTokenService.deleteToken(user.id);
      return { message: 'Password has been changed' };
    } catch (error) {
      console.error();
      throw new BadRequestException(`Can't reset password: ${error}`);
    }
  }

  async logout(userId: number) {
    const isTokenExist = await this.tokensService.findOne(userId);
    if (!isTokenExist) {
      throw new UnauthorizedException('Access denied');
    }
    return this.tokensService.remove(userId);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const resetToken = crypto.randomUUID();

      await this.resetTokenService.createResetToken(
        user.id,
        resetToken,
        expiryDate,
      );

      await this.emailService.sendEmail(email, resetToken);
    }

    return { message: 'Please check your email and follow the link' };
  }
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    const rfToken = await this.tokensService.findOne(userId);

    if (!user || !rfToken) {
      throw new ForbiddenException('Access denied');
    }

    const isRfTokensMatches = await bcrypt.compare(
      refreshToken,
      rfToken.refreshToken,
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
