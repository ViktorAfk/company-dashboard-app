import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [AppConfigModule],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
