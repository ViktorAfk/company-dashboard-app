import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LocationsModule } from 'src/locations/locations.module';
import { PricesModule } from 'src/prices/prices.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [DatabaseModule, LocationsModule, PricesModule],
  exports: [CompaniesService],
})
export class CompaniesModule {}
