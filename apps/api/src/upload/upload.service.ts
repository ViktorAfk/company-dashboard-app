import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class UploadService {
  private bucketName = this.appConfigService.AwsLogosBucket;
  private client: S3Client;

  constructor(private readonly appConfigService: AppConfigService) {
    const s3_Region = this.appConfigService.AwsS3Region;
    if (!s3_Region) {
      throw new Error('S3_REGION not found in environment variables');
    }
    this.client = new S3Client({
      region: s3_Region,
      credentials: {
        accessKeyId: this.appConfigService.AwsAccessKeyID,
        secretAccessKey: this.appConfigService.AwsSecretAccessKey,
      },
      forcePathStyle: true,
    });
  }

  async save(
    fileName: string,
    file: Buffer,
    fileType: string,
    folder: 'user-avatar' | 'company-avatar',
  ) {
    try {
      const fileId = crypto.randomUUID();
      const command = new PutObjectCommand({
        Bucket: this.bucketName,

        Key: `${folder}/${fileId}`,
        Body: file,
        ContentType: fileType,
        Metadata: {
          originalName: fileName,
        },
      });

      await this.client.send(command);
      const { url } = await this.getFileUrl(fileId, folder);

      return {
        url,
        fileId,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    fieldId: string,
    folder: 'user-avatar' | 'company-avatar',
    fileName: string,
    file: Buffer,
    fileType: string,
  ) {
    try {
      await this.remove(fieldId, folder);
      return this.save(fileName, file, fileType, folder);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(fileUrl: string, folder: 'user-avatar' | 'company-avatar') {
    const fieldId = fileUrl.split('/').at(-1);
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: `${folder}/${fieldId}`,
      });

      await this.client.send(command);
      return { message: 'File deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getFileUrl(key: string, folderName: string) {
    return {
      url: `https://${this.bucketName}.s3.amazonaws.com/${folderName}/${key}`,
    };
  }
}
