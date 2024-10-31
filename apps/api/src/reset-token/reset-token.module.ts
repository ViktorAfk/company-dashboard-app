import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResetTokenService } from './reset-token.service';

@Module({
  providers: [ResetTokenService],
  exports: [ResetTokenService],
  imports: [DatabaseModule],
})
export class ResetTokenModule {}
