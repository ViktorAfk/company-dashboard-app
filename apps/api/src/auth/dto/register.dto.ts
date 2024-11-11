import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MaxLength(20, { message: 'Name must be between 1 and 20 characters.' })
  @Matches(/^[A-Z][a-z]*$/, {
    message:
      'Name must start with an uppercase letter followed by lowercase letters.',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MaxLength(30, { message: 'Surname must be between 1 and 30 characters.' })
  @Matches(/^[A-Z][a-z]*$/, {
    message: 'Surname must contain only alphabetic characters.',
  })
  surname: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, and number',
    },
  )
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
