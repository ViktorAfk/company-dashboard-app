import { Module } from '@nestjs/common';
import { CompaniesModule } from 'src/companies/companies.module';
import { UsersModule } from 'src/users/users.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [UsersModule, CompaniesModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
