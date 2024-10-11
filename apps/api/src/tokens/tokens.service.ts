import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';

const SALT = process.env.SALT_ROUNDS;

@Injectable()
export class TokensService {
  constructor(private readonly databaseService: DatabaseService) {}
  async save(userId: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, +SALT);

    const token = await this.findOne(userId);
    if (token) {
      return this.databaseService.token.update({
        where: {
          userId,
        },
        data: {
          refreshToken: hashedToken,
        },
      });
    }

    return this.databaseService.token.create({
      data: {
        userId,
        refreshToken: hashedToken,
      },
    });
  }

  findOne(userId: number) {
    return this.databaseService.token.findUnique({
      where: {
        userId,
      },
    });
  }

  async remove(userId: number) {
    return this.databaseService.token.delete({
      where: {
        userId,
      },
    });
  }
}
