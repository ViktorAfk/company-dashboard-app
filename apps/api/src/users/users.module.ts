import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DatabaseModule, AppConfigModule],
  exports: [UsersService],
})
export class UsersModule {}
