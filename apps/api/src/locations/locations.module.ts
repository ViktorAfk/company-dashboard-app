import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports: [DatabaseModule],
  exports: [LocationsService],
})
export class LocationsModule {}
