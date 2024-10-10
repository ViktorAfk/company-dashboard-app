import { ApiProperty } from '@nestjs/swagger';

export class MetaData {
  @ApiProperty()
  count: number;

  @ApiProperty()
  previous: number | null;

  @ApiProperty()
  next: number | null;

  @ApiProperty()
  lastPage: number;
}

export class ResponseEntity<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty()
  meta: MetaData;

  constructor(data: T[], meta: MetaData) {
    this.data = data;
    this.meta = meta;
  }
}
