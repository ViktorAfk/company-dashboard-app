import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [DatabaseModule, UsersModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
