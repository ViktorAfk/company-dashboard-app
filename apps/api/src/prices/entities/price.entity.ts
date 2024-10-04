import { ApiProperty } from '@nestjs/swagger';
import { Price } from '@prisma/client';

export class PriceEntity implements Price {
  @ApiProperty()
  id: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  companyId: number;
}
