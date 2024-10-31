import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgoPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
