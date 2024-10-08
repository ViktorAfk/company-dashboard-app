import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const salt = process.env.SALT_ROUNDS;
@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(salt),
    );
    console.log(hashedPassword);
    return this.databaseService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  async findAll(role?: Role, page?: number, perPage?: number) {
    const skipItems = page > 0 ? perPage * (page - 1) : 0;

    if (role) {
      return this.databaseService.user.findMany({
        skip: skipItems,
        take: perPage,
        where: {
          role,
        },
      });
    }
    return this.databaseService.user.findMany({
      skip: skipItems,
      take: perPage,
    });
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
}
