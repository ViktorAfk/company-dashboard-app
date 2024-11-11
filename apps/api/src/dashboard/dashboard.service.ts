import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly userService: UsersService,
    private readonly companiesService: CompaniesService,
  ) {}

  getAllUsers(query: {
    page?: number;
    limit?: number;
  }) {
    return this.userService.findAll('USER', query.page, query.limit);
  }

  getAllAdmins(query: {
    page?: number;
    limit?: number;
  }) {
    return this.userService.findAll('ADMIN', query.page, query.limit);
  }

  getAllCompanies(query: {
    searchByName?: string;
    searchByService?: string;
    sortByCreatedDate?: 'asc' | 'desc';
    sortByCapital?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    return this.companiesService.findAll(query);
  }

  getCompaniesForAdminDashBoard(
    userId: number,
    role: Role,
    query: {
      searchByName?: string;
      sortByCapital?: 'asc' | 'desc';
      page?: number;
      limit?: number;
    },
  ) {
    return this.companiesService.findAllForAdminsDashboard(userId, role, query);
  }
}
