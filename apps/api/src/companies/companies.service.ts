import { Injectable } from '@nestjs/common';
import { getSkippedItems } from 'src/common/decorators/get-skipped-items';
import { DatabaseService } from 'src/database/database.service';
import { LocationsService } from 'src/locations/locations.service';
import { PricesService } from 'src/prices/prices.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly locationService: LocationsService,
    private readonly priceService: PricesService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
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
      searchByName?: string;
      searchByService?: string;
      sortByCreatedDate?: 'asc' | 'desc';
      sortByCapital?: 'asc' | 'desc';
      page?: number;
      limit?: number;
    },
  ) {
    const {
      page,
      limit,
      searchByName,
      searchByService,
      sortByCapital,
      sortByCreatedDate,
    } = query;
    const skipItems = getSkippedItems(page, limit);

    return this.databaseService.company.findMany({
      orderBy: [
        {
          createdDate: sortByCreatedDate,
        },
        {
          capital: sortByCapital,
        },
      ],
      skip: skipItems,
      take: limit,
      where: {
        userId,
        companyName: {
          contains: searchByName,
          mode: 'insensitive',
        },
        service: {
          contains: searchByService,
          mode: 'insensitive',
        },
      },
      include: {
        Location: true,
        prices: true,
      },
    });
  }

  findAll(query: {
    searchByName?: string;
    searchByService?: string;
    sortByCreatedDate?: 'asc' | 'desc';
    sortByCapital?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const {
      page,
      limit,
      searchByName,
      searchByService,
      sortByCapital,
      sortByCreatedDate,
    } = query;
    const skipItems = getSkippedItems(page, limit);

    return this.databaseService.company.findMany({
      orderBy: [
        {
          createdDate: sortByCreatedDate,
        },
        {
          capital: sortByCapital,
        },
      ],
      where: {
        companyName: {
          contains: searchByName,
          mode: 'insensitive',
        },
        service: {
          contains: searchByService,
          mode: 'insensitive',
        },
      },
      skip: skipItems,
      take: limit,
      include: {
        Location: true,
        prices: true,
      },
    });
  }

  findAllForAdminsDashboard(query: {
    searchByName?: string;
    sortByCapital?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const { page, limit, searchByName, sortByCapital } = query;
    const skipItems = getSkippedItems(page, limit);

    return this.databaseService.company.findMany({
      orderBy: [
        {
          capital: sortByCapital,
        },
      ],
      where: {
        companyName: {
          contains: searchByName,
          mode: 'insensitive',
        },
      },
      skip: skipItems,
      take: limit,
      select: {
        companyName: true,
        capital: true,
      },
    });
  }

  findAllForUsersDashboard(userId: number) {
    return this.databaseService.company.findMany({
      where: {
        userId,
      },
    });
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
