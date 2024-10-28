import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'Role of the user', enum: $Enums.Role })
  @IsNotEmpty()
  @IsEnum($Enums.Role)
  role: $Enums.Role;
}
