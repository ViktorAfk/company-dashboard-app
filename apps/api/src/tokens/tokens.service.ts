import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from 'src/config/app-config.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TokensService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly appConfigService: AppConfigService,
  ) {}
  async save(userId: number, refreshToken: string) {
    const SALT = this.appConfigService.saltRounds;
    const hashedToken = await bcrypt.hash(refreshToken, SALT);

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
