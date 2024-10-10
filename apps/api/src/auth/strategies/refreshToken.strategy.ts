import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtRefreshSecret,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: { sub: number; email: string }) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
    console.log('hello');

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }
    return { ...payload, refreshToken };
  }
}
