import { ApiProperty } from '@nestjs/swagger';

export class LoadImageDto {
  @ApiProperty()
  file: Express.Multer.File;
}
