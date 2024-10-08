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

  findAllUsersCompany(
    userId: number,
    query: {
      name: string;
      service: string;
      sortByCreatedDate: 'asc' | 'desc';
      sortByCapital: 'asc' | 'decs';
    },
  ) {
    const { name, service, sortByCapital, sortByCreatedDate } = query;

    return this.databaseService.company.findMany({
      orderBy: [
        {
          createdDate: sortByCreatedDate,
        },
      ],
      where: {
        userId,
        companyName: {
          contains: name,
          mode: 'insensitive',
        },
        service: {
          contains: service,
          mode: 'insensitive',
        },
      },
      include: {
        Location: true,
        prices: true,
      },
    });
  }

  findAll() {
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
