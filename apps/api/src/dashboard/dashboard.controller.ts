import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompanyEntity } from 'src/companies/entities/company.entity';
import { DashboardService } from './dashboard.service';
import { QueryDashBoardCompanyDTO } from './dto/query-dashboard-company.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('companies')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity, isArray: true })
  getAllCompanies(@Query() query: QueryDashBoardCompanyDTO) {
    return this.dashboardService.getAllCompanies(query);
  }
}
