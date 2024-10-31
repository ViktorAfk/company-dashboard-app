import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendEmail(email: string, resetToken: string) {
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    const emailInfo = {
      to: email,
      text: 'I am email',
      html: this.generateHTMLLink(resetLink),
      subject: 'Reset password message',
    };

    return this.mailService.sendMail(emailInfo);
  }

  generateHTMLLink(resetLink: string) {
    return `<p>You requested a password reset. Click the link bellow to reset your password <span><a href="${resetLink}">Link</a></span></p>`;
  }
}
