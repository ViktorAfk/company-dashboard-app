import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @ApiProperty()
  @IsOptional()
  companyName: string;

  @ApiProperty()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsOptional()
  service: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  capital: number;

  @ApiProperty()
  @IsOptional()
  createdDate: string;

  @ApiProperty()
  @IsOptional()
  location: Location;
}
