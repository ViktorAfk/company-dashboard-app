import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20, { message: 'Name must be between 1 and 20 characters.' })
  @Matches(/^[A-Z][a-z]*$/, {
    message: 'Name must contain only alphabetic characters.',
  })
  name: string;

  @ApiProperty()
  avatar: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(30, { message: 'Surname must be between 1 and 30 characters.' })
  @Matches(/^[A-Z][a-z]*$/, {
    message: 'Surname must contain only alphabetic characters.',
  })
  surname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
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
