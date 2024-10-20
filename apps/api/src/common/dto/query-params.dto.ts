import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  searchByName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  searchByService?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortByCreatedDate?: 'asc' | 'desc';

  @ApiProperty()
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortByCapital?: 'asc' | 'desc';

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(4)
  @Type(() => Number)
  limit?: number = 6;
}
