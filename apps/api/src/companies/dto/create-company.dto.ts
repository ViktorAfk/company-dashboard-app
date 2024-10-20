import { ApiProperty } from '@nestjs/swagger';
import { Company, Location, Price } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto
  implements Omit<Company, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  companyName: string;

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
  @IsString()
  createdDate: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @ApiProperty()
  location: Omit<Location, 'id' | 'companyId'>;

  @IsNotEmpty()
  @ApiProperty()
  prices: Omit<Price, 'id' | 'companyId'>[];
}
