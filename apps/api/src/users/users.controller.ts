import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(
    @Query('page', ParseIntPipe) page?: number,
    @Query('perPage', ParseIntPipe) perPage?: number,
    @Query('role') role?: Role,
  ) {
    const responseData = await this.usersService.findAll(role, page, perPage);

    return {
      ...responseData,
      data: responseData.data.map((user) => new UserEntity(user)),
    };
  }

  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Roles('USER')
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Roles('SUPER_ADMIN')
  @Patch('admins/:adminId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Roles('USER')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id));
  }

  @Roles('SUPER_ADMIN')
  @Delete('admins/:adminId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async removeAdmin(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.removeAdminData(id));
  }
}
