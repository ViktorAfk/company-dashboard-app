import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { DatabaseModule } from 'src/database/database.module';
import { TokensService } from './tokens.service';

@Module({
  imports: [DatabaseModule, AppConfigModule],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
