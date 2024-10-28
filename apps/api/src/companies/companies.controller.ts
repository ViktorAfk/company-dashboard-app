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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { GetCurrentUser, Roles } from 'src/common/decorators';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { QueryCompanyDto } from './dto/query-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';

@Controller('companies')
@ApiTags('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Roles('USER')
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CompanyEntity })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Roles('USER')
  @Post(':companyId/attachment')
  @Roles('USER')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ type: CompanyEntity })
  loadCompanyLogo(
    @Param('companyId', ParseIntPipe) companyId: number,
    @GetCurrentUser('role') role: Role,
    @GetCurrentUser('sub') sub: number,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  ) {
    return this.companiesService.loadImage(
      companyId,
      file.originalname,
      file.mimetype,
      file.buffer,
      role,
      sub,
    );
  }

  @Roles('USER')
  @Get()
  @ApiOkResponse({ type: CompanyEntity, isArray: true })
  findAllByUser(
    @GetCurrentUser('sub') userId: number,
    @Query() query: QueryCompanyDto,
  ) {
    return this.companiesService.findAllUsersCompany(userId, query);
  }

  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetCurrentUser('role') role: Role,
    @GetCurrentUser('sub') sub: number,
  ) {
    return this.companiesService.findOne(id, role, sub);
  }

  @Roles('USER')
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @GetCurrentUser('role') role: Role,
    @GetCurrentUser('sub') userId: number,
  ) {
    return this.companiesService.update(id, updateCompanyDto, role, userId);
  }

  @Roles('USER')
  @Post(':companyId/attachment')
  @Roles('USER')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ type: CompanyEntity })
  updateCompanyLogo(
    @Param('companyId', ParseIntPipe) companyId: number,
    @GetCurrentUser('role') role: Role,
    @GetCurrentUser('sub') sub: number,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  ) {
    return this.companiesService.updateImage(
      companyId,
      file.originalname,
      file.mimetype,
      file.buffer,
      role,
      sub,
    );
  }
  @Roles('USER')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetCurrentUser('role') role: Role,
    @GetCurrentUser('sub') userId: number,
  ) {
    return this.companiesService.remove(id, role, userId);
  }

  @Roles('USER')
  @Delete(':companyId/attachment')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyEntity })
  removeLogo(
    @Param('companyId', ParseIntPipe) companyId: number,
    @GetCurrentUser('role') role: Role,
    @GetCurrentUser('sub') sub: number,
  ) {
    return this.companiesService.removeCompanyLogo(role, sub, companyId);
  }
}
