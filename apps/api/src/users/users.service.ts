import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { getSkippedItems } from 'src/common/decorators/get-skipped-items';
import { AppConfigService } from 'src/config/app-config.service';
import { DatabaseService } from 'src/database/database.service';
import { UploadService } from 'src/upload/upload.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly appConfigService: AppConfigService,
    private readonly uploadService: UploadService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const SALT = this.appConfigService.saltRounds;
    const hashedPassword = await bcrypt.hash(createUserDto.password, SALT);

    return this.databaseService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  async findAll(role?: Role, page = 1, limit = 8) {
    const skippedItems = getSkippedItems(page, limit);

    const [count, data] = await Promise.all([
      this.databaseService.user.count({
        where: {
          role,
        },
      }),

      this.databaseService.user.findMany({
        where: {
          role,
        },
        skip: skippedItems,
        take: limit,
      }),
    ]);

    const lastPage = Math.ceil(count / limit);

    return {
      data,
      meta: {
        count,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ${id} doesn't found`);
    }

    return user;
  }

  findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id:${id} doesn't found`);
    }

    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async updateAdminData(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id:${id} doesn't found`);
    }

    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('Can only update admin users');
    }

    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id:${id} doesn't found`);
    }

    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }

  async removeAdminData(adminId: number) {
    const admin = await this.databaseService.user.findUnique({
      where: {
        id: adminId,
        role: 'ADMIN',
      },
    });

    if (!admin) {
      throw new NotFoundException(`User with id:${adminId} doesn't found`);
    }

    return this.databaseService.user.delete({
      where: {
        id: adminId,
      },
    });
  }

  async updateUserPassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id:${id} doesn't found`);
    }

    const isCurrentPasswordValid = bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Password is not valid');
    }
    const SALT = this.appConfigService.saltRounds;
    const newHashedPassword = await bcrypt.hash(newPassword, SALT);

    return this.databaseService.user.update({
      where: { id },
      data: {
        password: newHashedPassword,
      },
    });
  }

  async updateUserAvatar(
    fileName: string,
    file: Buffer,
    fileType: string,
    id: number,
  ) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id:${id} doesn't found`);
    }
    const { url } = await this.uploadService.save(
      fileName,
      file,
      fileType,
      'user-avatar',
    );
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        avatar: url,
      },
    });
  }
}
