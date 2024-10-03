import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createCompanyDto: CreateCompanyDto) {
    const { location, price, ...companyData } = createCompanyDto;
    return this.databaseService.company.create({
      data: {
        ...companyData,
        Location: {
          create: {
            ...location,
          },
        },
        prices: {
          create: {
            ...price,
          },
        },
      },
      include: {
        prices: {
          select: {
            id: true,
          },
        },
        Location: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  findAll(userId?: number) {
    if (userId) {
      return this.databaseService.company.findMany({
        where: {
          userId,
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
    });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const { prices, location, ...updateData } = updateCompanyDto;

    return this.databaseService.company.update({
      where: {
        id,
      },
      data: {
        ...updateData,
        Location: {
          update: {
            ...location,
          },
        },
        prices: {
          updateMany: prices.map(({ id, date, price }) => ({
            where: { id },
            data: { price, date },
          })),
        },
      },
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
