import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';

export class LocationEntity implements Location {
  @ApiProperty()
  id: number;

  @ApiProperty()
  zip: number;

  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  building: number;

  @ApiProperty()
  companyId: number;
}
