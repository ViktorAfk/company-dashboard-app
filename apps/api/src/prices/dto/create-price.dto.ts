import { ApiProperty } from '@nestjs/swagger';
import { Price } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePriceDto implements Omit<Price, 'id'> {
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  companyId: number;
}
