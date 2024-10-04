import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  role: $Enums.Role;
}
