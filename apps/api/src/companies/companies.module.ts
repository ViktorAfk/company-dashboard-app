import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [DatabaseModule],
})
export class CompaniesModule {}
