import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { AppConfigService } from 'src/config/app-config.service';
import { EmailService } from './email.service';

@Module({
  imports: [
    AppConfigModule,
    MailerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: ({
        SmtpHost,
        SmtpPort,
        SmtpUser,
        SmtpPassword,
      }: AppConfigService) => ({
        transport: {
          host: SmtpHost,
          port: SmtpPort,
          auth: {
            user: SmtpUser,
            pass: SmtpPassword,
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
