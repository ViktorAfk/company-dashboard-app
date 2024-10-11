import { ApiProperty } from '@nestjs/swagger';

export class MetaData {
  @ApiProperty({ example: 20 })
  count: number;

  @ApiProperty({ example: 1, nullable: true })
  previous: number | null;

  @ApiProperty({ example: 2, nullable: true })
  next: number | null;

  @ApiProperty({ example: 2 })
  lastPage: number;
}
