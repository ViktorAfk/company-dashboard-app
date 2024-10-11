import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('Refresh token is missing');
    }
    return super.canActivate(context);
  }
}
