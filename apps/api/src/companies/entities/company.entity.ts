import { ApiProperty } from '@nestjs/swagger';
import { Company, Location, Price } from '@prisma/client';

export class CompanyEntity implements Company {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  service: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdDate: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  location: Location;

  @ApiProperty()
  prices: Price[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
