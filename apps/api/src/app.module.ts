import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CompaniesModule } from './companies/companies.module';
import { AppConfigModule } from './config/app-config.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';
import { LocationsModule } from './locations/locations.module';
import { PricesModule } from './prices/prices.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { TokensModule } from './tokens/tokens.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { ResetTokenModule } from './reset-token/reset-token.module';

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
    UploadModule,
    AppConfigModule,
    EmailModule,
    ResetTokenModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
    EmailService,
  ],
})
export class AppModule {}
