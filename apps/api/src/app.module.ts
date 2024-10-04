import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { PricesModule } from './prices/prices.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [DatabaseModule, UsersModule, CompaniesModule, PricesModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
