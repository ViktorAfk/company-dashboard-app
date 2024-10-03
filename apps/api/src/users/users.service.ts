import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({ data: createUserDto });
  }

  findAll(role?: Role) {
    if (role) {
      return this.databaseService.user.findMany({
        where: {
          role,
        },
      });
    }
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.databaseService.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
