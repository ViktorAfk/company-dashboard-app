import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocationDto implements Omit<Location, 'id'> {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  zip: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  building: number;

  @IsNotEmpty()
  @ApiProperty()
  companyId: number;
}
