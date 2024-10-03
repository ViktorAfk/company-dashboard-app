import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  password: string;

  @ApiProperty()
  role: $Enums.Role;
}
