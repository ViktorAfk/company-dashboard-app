import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CompaniesModule } from './companies/companies.module';
import { DatabaseModule } from './database/database.module';
import { LocationsModule } from './locations/locations.module';
import { PricesModule } from './prices/prices.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    CompaniesModule,
    PricesModule,
    LocationsModule,
    AuthModule,
    TokensModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
