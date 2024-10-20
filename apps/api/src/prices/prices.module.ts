import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';

@Module({
  controllers: [PricesController],
  providers: [PricesService],
  imports: [DatabaseModule],
  exports: [PricesService],
})
export class PricesModule {}
