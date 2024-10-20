import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/app-config.service';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly tokenService: TokensService,
    private readonly appConfigService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigService.JwtRefreshSecret,
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: { sub: number; email: string }) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
    const isRefreshTokenExist = await this.tokenService.findOne(payload.sub);

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    if (!isRefreshTokenExist) {
      throw new UnauthorizedException('Refresh token is missing in DB');
    }

    return { ...payload, refreshToken };
  }
}
