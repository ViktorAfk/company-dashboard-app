import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, Roles } from 'src/common/decorators';
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

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get('companies')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'A list of companies with pagination metadata',
    type: CompanyDashboardAdminEntity,
  })
  getAllCompaniesForAdmins(@Query() query: QueryCompanyAdminsDto) {
    return this.dashboardService.getCompaniesForAdminDashBoard(query);
  }

  @Roles('USER')
  @Get('user/companies')
  @ApiBearerAuth()
  getAllCompaniesForUsers(
    @GetCurrentUser('sub') userId: number,
    @Query() query: QueryDashBoardUserCompaniesDTO,
  ) {
    return this.dashboardService.getCompaniesForUserDashboard(userId, query);
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
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

  @Roles('SUPER_ADMIN')
  @Get('admins')
  @ApiBearerAuth()
  @ApiOkResponse({ type: DashBoardUserEntity })
  async getAllAdmins(@Query() query: QueryUsersDTO) {
    const responseData = await this.dashboardService.getAllAdmins(query);

    return {
      ...responseData,
      data: responseData.data.map((user) => new UserEntity(user)),
    };
  }
}
