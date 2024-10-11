import { ApiProperty } from '@nestjs/swagger';
import { MetaData } from 'src/common/entity/response.entity';

class CompaniesAdmin {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'PepsiCo-La' })
  companyName: string;

  @ApiProperty({ example: 400000000 })
  capital: number;
}

export class CompanyDashboardAdminEntity {
  @ApiProperty({ isArray: true })
  data: CompaniesAdmin;

  @ApiProperty()
  meta: MetaData;
}
