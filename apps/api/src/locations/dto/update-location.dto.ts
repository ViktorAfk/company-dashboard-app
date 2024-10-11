import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @IsOptional()
  @ApiProperty()
  zip: number;

  @IsOptional()
  @ApiProperty()
  country: string;

  @IsOptional()
  @ApiProperty()
  city: string;

  @IsOptional()
  @ApiProperty()
  street: string;

  @IsOptional()
  @ApiProperty()
  building: number;
}
