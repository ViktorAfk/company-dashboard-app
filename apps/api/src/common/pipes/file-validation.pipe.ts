import { BadRequestException, PipeTransform } from '@nestjs/common';

export class FileValidationPipe implements PipeTransform {
  private readonly allowedTypes = ['image/jpeg', 'image/png', 'image/tft'];
  private readonly maxSize = 1024 * 1024;

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${this.maxSize / (1024 * 1024)} MB.`,
      );
    }

    if (!this.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.allowedTypes.join(', ')}`,
      );
    }

    return file;
  }
}
