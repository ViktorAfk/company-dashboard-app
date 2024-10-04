import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DatabaseModule],
})
export class UsersModule {}
