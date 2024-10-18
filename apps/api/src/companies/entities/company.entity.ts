import { ApiProperty } from '@nestjs/swagger';
import { Company, Location, Price } from '@prisma/client';

export class CompanyEntity implements Company {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  avatar: string | null;

  @ApiProperty()
  service: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  capital: number;

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
