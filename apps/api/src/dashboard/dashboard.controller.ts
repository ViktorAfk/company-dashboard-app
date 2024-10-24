import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetCurrentUser } from 'src/common/decorators';
import { UserEntity } from 'src/users/entities/user.entity';
import { DashboardService } from './dashboard.service';
import { QueryCompanyAdminsDto } from './dto/query-dashboard-admins.dto';
import { QueryDashBoardUserCompaniesDTO } from './dto/query-dashboard-company.dto';
import { QueryUsersDTO } from './dto/query-users.dto';
import { CompanyDashboardAdminEntity } from './entity/dashboard-companies.entity';
import { DashBoardUserEntity } from './entity/dashboard-users.entity';

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('companies')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'A list of companies with pagination metadata',
    type: CompanyDashboardAdminEntity,
  })
  getAllCompaniesForAdmins(@Query() query: QueryCompanyAdminsDto) {
    return this.dashboardService.getCompaniesForAdminDashBoard(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/companies')
  @ApiBearerAuth()
  getAllCompaniesForUsers(
    @GetCurrentUser('sub') userId: number,
    @Query() query: QueryDashBoardUserCompaniesDTO,
  ) {
    return this.dashboardService.getCompaniesForUserDashboard(userId, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiBearerAuth()
  @ApiOkResponse({ type: DashBoardUserEntity })
  async getAllUsers(@Query() query: QueryUsersDTO) {
    const responseData = await this.dashboardService.getAllUsers(query);

    return {
      ...responseData,
      data: responseData.data.map((user) => new UserEntity(user)),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('admins')
  @ApiBearerAuth()
  @ApiOkResponse({ type: DashBoardUserEntity })
  getAllAdmins(@Query() query: QueryUsersDTO) {
    return this.dashboardService.getAllAdmins(query);
  }
}
