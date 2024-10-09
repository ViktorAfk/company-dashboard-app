import { Injectable } from '@nestjs/common';
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly userService: UsersService,
    private readonly companiesService: CompaniesService,
  ) {}

  getAllUsers() {
    return this.userService.findAll('USER');
  }

  getAllAdmins() {
    return this.userService.findAll('ADMIN');
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

  gatCompaniesForAdmins(query: {
    searchByName?: string;
    sortByCapital?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    return this.companiesService.findAllForAdminsDashboard(query);
  }
}
