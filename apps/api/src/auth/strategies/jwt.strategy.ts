import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/app-config.service';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';

type JwtPayload = {
  sub: number;
  email: string;
  role: Role;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly tokenService: TokensService,
    private readonly userService: UsersService,
    private readonly appConfigService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigService.JwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const token = await this.tokenService.findOne(payload.sub);
    const user = await this.userService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Refresh token not found');
    }
    if (!token) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return payload;
  }
}
