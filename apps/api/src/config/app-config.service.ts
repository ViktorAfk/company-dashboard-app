import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const validEnvs = ['development', 'production'] as const;

const validationObject = z.object({
  APP_ENV: z.enum(validEnvs),
  PORT: z.string().min(0).max(65535),
  DATABASE_URL: z.string().url(),
  WEB_URL: z.string().url(),
  SALT_ROUNDS: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_REGION: z.string(),
  AWS_LOGOS_BUCKET: z.string(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});

@Injectable()
export class AppConfigService {
  static validate = (
    config: Record<string, unknown>,
  ): z.infer<typeof validationObject> => validationObject.parse(config);
  constructor(
    private readonly configService: ConfigService<
      z.infer<typeof validationObject>,
      true
    >,
  ) {}

  get env(): (typeof validEnvs)[number] {
    return this.configService.get('APP_ENV');
  }

  get port(): number {
    return Number(this.configService.get('PORT'));
  }

  get dbUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  get webUrl(): string {
    return this.configService.get<string>('WEB_URL');
  }

  get AwsLogosBucket(): string {
    return this.configService.get<string>('AWS_LOGOS_BUCKET');
  }

  get AwsS3Region(): string {
    return this.configService.get<string>('AWS_S3_REGION');
  }

  get AwsAccessKeyID(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY_ID');
  }

  get AwsSecretAccessKey(): string {
    return this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }
  get JwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
  get JwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET');
  }
  get saltRounds(): number {
    return Number(this.configService.get('SALT_ROUNDS'));
  }
}
