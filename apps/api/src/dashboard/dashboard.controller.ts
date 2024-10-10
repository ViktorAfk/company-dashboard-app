import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators';
import { ResponseEntity } from 'src/common/entity/response.entity';
import { CompanyEntity } from 'src/companies/entities/company.entity';
import { DashboardService } from './dashboard.service';
import { QueryCompanyAdminsDto } from './dto/query-dashboard-admins.dto';
import { QueryUsersDTO } from './dto/query-users.dto';

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('companies')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResponseEntity<CompanyEntity> })
  getAllCompanies(
    @Query() query: QueryCompanyAdminsDto,
    @GetCurrentUser('userId') userId: number,
    @GetCurrentUser('role') role: Role,
  ) {
    return this.dashboardService.getCompaniesForDashBoard(userId, role, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity, isArray: true })
  getAllUsers(@Query() query: QueryUsersDTO) {
    return this.dashboardService.getAllUsers(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admins')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity, isArray: true })
  getAllAdmins(@Query() query: QueryUsersDTO) {
    return this.dashboardService.getAllAdmins(query);
  }
}
