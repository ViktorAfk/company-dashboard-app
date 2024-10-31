import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  resetToken: string;

  @IsNotEmpty()
  @ApiProperty()
  @Matches(passwordRules)
  newPassword: string;
}
