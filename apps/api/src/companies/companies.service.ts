import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { getSkippedItems } from 'src/common/decorators/get-skipped-items';
import { DatabaseService } from 'src/database/database.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async findAllUsersCompany(
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
    const data = await this.getPaginationData(query, userId);

    return data;
  }

  async findAll(query: {
    searchByName?: string;
    searchByService?: string;
    sortByCreatedDate?: 'asc' | 'desc';
    sortByCapital?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const data = await this.getPaginationData(query);

    return data;
  }

  async findAllForAdminsDashboard(query: {
    searchByName?: string;
    sortByCapital?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const { page, limit, searchByName, sortByCapital } = query;
    const skipItems = getSkippedItems(page, limit);
    const orderBy = [
      {
        capital: sortByCapital,
      },
    ];

    const [count, data] = await Promise.all([
      this.databaseService.company.count({
        orderBy,
        where: {
          companyName: {
            contains: searchByName,
            mode: 'insensitive',
          },
        },
      }),
      this.databaseService.company.findMany({
        orderBy,
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

  async findAllForUsersDashboard(
    userId: number,
    query: {
      searchByName?: string;
      page?: number;
      limit?: number;
    },
  ) {
    const { page, limit, searchByName } = query;
    const skipItems = getSkippedItems(page, limit);

    const [count, data] = await Promise.all([
      this.databaseService.company.count({
        where: {
          userId,
          companyName: {
            contains: searchByName,
            mode: 'insensitive',
          },
        },
      }),

      this.databaseService.company.findMany({
        where: {
          userId,
        },
        select: {
          companyName: true,
          prices: true,
        },
        skip: skipItems,
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

  async findOne(id: number, role: Role, userId: number) {
    const company = await this.databaseService.company.findUnique({
      where: {
        id,
      },
      include: {
        Location: true,
        prices: true,
      },
    });

    if (!company) {
      throw new NotFoundException('Current company not found');
    }

    if (role === 'USER' && company.userId !== userId) {
      throw new ForbiddenException(
        'User with role("User") has access only to his companies',
      );
    }

    return company;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    role: Role,
    userId: number,
  ) {
    const company = await this.findOne(id, role, userId);
    if (!company) {
      throw new NotFoundException('Current company not found');
    }

    return this.databaseService.company.update({
      where: {
        id,
      },
      data: updateCompanyDto,
    });
  }

  async remove(id: number, role: Role, userId: number) {
    const company = await this.findOne(id, role, userId);
    if (!company) {
      throw new NotFoundException('Current company not found');
    }

    return this.databaseService.company.delete({
      where: {
        id,
      },
    });
  }

  async getPaginationData(
    query: {
      searchByName?: string;
      searchByService?: string;
      sortByCreatedDate?: 'asc' | 'desc';
      sortByCapital?: 'asc' | 'desc';
      page?: number;
      limit?: number;
    },
    userId?: number,
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
    const orderBy = [
      {
        createdDate: sortByCreatedDate,
      },
      {
        capital: sortByCapital,
      },
    ];

    const [count, data] = await Promise.all([
      this.databaseService.company.count({
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
      }),
      this.databaseService.company.findMany({
        orderBy,
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
}
