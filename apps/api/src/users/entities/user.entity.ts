import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Escobar' })
  surname: string;

  @ApiProperty({ example: '01-08-2024' })
  createdAt: Date;

  @ApiProperty({ example: '01-08-2024' })
  updatedAt: Date;

  @ApiProperty({ example: 'Pablo' })
  name: string;

  @ApiProperty({ example: 'pablo.col@gmail.com' })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({ example: 'USER' })
  role: $Enums.Role;

  @IsOptional()
  @ApiProperty({ example: 'http:your.image.com/image' })
  avatar: string | null;
}
