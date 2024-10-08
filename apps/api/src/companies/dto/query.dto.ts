import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  service: string;

  @ApiProperty()
  @IsOptional()
  sortByCreatedDate: string;

  @ApiProperty()
  @IsOptional()
  sortByCapital: string;
}
