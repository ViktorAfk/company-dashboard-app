import { ApiProperty } from '@nestjs/swagger';
import { Location, Price } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @ApiProperty()
  @IsOptional()
  companyName: string;

  @ApiProperty()
  @IsOptional()
  service: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  createdDate: string;

  @ApiProperty()
  @IsOptional()
  location: Location;

  @ApiProperty()
  @IsOptional()
  prices: Price[];
}
