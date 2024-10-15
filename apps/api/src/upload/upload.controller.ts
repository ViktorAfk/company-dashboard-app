import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('user')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserAvatar(
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ) {
    return this.uploadService.uploadUserAvatar(
      file.originalname,
      file.buffer,
      file.mimetype,
    );
  }
  @Delete(':imageId')
  async delete(@Param('imageId') imageId: string) {
    return this.uploadService.deleteFile(imageId);
  }
}
