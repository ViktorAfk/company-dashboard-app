import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ResetTokenService {
  constructor(private readonly dataBaseService: DatabaseService) {}
  createResetToken(userId: number, resetToken: string, expiryDate: Date) {
    return this.dataBaseService.resetToken.create({
      data: {
        userId,
        resetToken,
        expiryDate,
      },
    });
  }

  find(resetToken: string) {
    return this.dataBaseService.resetToken.findUnique({
      where: {
        resetToken,
      },
    });
  }

  deleteToken(userId: number) {
    return this.dataBaseService.resetToken.delete({
      where: {
        userId,
      },
    });
  }
}
