import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { ForgoPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthEntity } from './entity/auth.entity';
import { RefreshAuthGuard } from './refresh-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Public()
  @Post('signup')
  @ApiOkResponse({ type: UserEntity })
  registration(@Body() input: RegisterDto) {
    return this.authService.register(input);
  }

  @Public()
  @Post('forgot-password')
  @ApiOkResponse({
    example: {
      message: 'Please check your email and follow the link',
    },
  })
  forgotPassword(@Body() input: ForgoPasswordDto) {
    return this.authService.forgotPassword(input.email);
  }

  @Public()
  @Post('reset-password')
  @ApiOkResponse({
    example: {
      message: 'Password has been changed',
    },
  })
  resetPassword(@Body() input: ResetPasswordDto) {
    return this.authService.resetPassword(input.resetToken, input.newPassword);
  }

  @Get('logout')
  @ApiOkResponse()
  @ApiBearerAuth()
  async logout(@GetCurrentUser('sub') userId: number) {
    await this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Get('refresh')
  @ApiOkResponse()
  @ApiBearerAuth()
  refresh(
    @GetCurrentUser('sub') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
