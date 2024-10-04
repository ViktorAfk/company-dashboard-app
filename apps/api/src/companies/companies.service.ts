import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createCompanyDto: CreateCompanyDto) {
    const { location, prices, ...companyData } = createCompanyDto;
    return this.databaseService.company.create({
      data: {
        ...companyData,
        Location: {
          create: {
            ...location,
          },
        },
        prices: {
          createMany: {
            data: prices,
          },
        },
      },
      include: {
        prices: true,
        Location: true,
      },
    });
  }

  findAll(userId?: number) {
    if (userId) {
      return this.databaseService.company.findMany({
        where: {
          userId,
        },
        include: {
          Location: true,
          prices: true,
        },
      });
    }
    return this.databaseService.company.findMany();
  }

  findOne(id: number) {
    return this.databaseService.company.findUnique({
      where: {
        id,
      },
      include: {
        Location: true,
        prices: true,
      },
    });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.databaseService.company.update({
      where: {
        id,
      },
      data: updateCompanyDto,
    });
  }

  remove(id: number) {
    return this.databaseService.company.delete({
      where: {
        id,
      },
    });
  }
}
