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

  getAllCompanies() {
    return this.companiesService.findAll();
  }
}
