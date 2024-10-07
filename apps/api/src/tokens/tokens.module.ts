import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TokensService } from './tokens.service';

@Module({
  imports: [DatabaseModule],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
