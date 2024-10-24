import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';

import { UploadService } from './upload.service';

@Module({
  imports: [AppConfigModule],
  providers: [UploadService],
  controllers: [],
  exports: [UploadService],
})
export class UploadModule {}
