import { ApiProperty } from '@nestjs/swagger';
import { Company, Location } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto
  implements Omit<Company, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  capital: number;

  @IsNotEmpty()
  @ApiProperty()
  createdDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @ApiProperty()
  location: Omit<Location, 'id' | 'companyId'>;
}
