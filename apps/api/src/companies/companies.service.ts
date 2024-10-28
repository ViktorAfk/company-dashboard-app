import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company, Role } from '@prisma/client';
import { getSkippedItems } from 'src/common/decorators/get-skipped-items';
import { DatabaseService } from 'src/database/database.service';
import { UploadService } from 'src/upload/upload.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly uploadService: UploadService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const { location, ...companyData } = createCompanyDto;

    return this.databaseService.company.create({
      data: {
        ...companyData,
        location: {
          create: {
            ...location,
          },
        },
      },
      include: {
        prices: true,
        location: true,
      },
    });
  }

  async findAllUsersCompany(
    userId: number,
    query: {
      searchByName?: string;
      searchByService?: string;
      sort?: keyof Pick<Company, 'createdDate' | 'capital'>;
      order?: 'asc' | 'desc';
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
    sort?: keyof Pick<Company, 'createdDate' | 'capital'>;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const data = await this.getPaginationData(query);

    return data;
  }

  async findAllForAdminsDashboard(query: {
    sort?: keyof Pick<Company, 'createdDate' | 'capital'>;
    order?: 'asc' | 'desc';
    searchByName?: string;
    page?: number;
    limit?: number;
  }) {
    const { page, limit, order, sort, searchByName } = query;
    const skipItems = getSkippedItems(page, limit);
    const orderBy = [
      {
        [order]: sort,
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
        location: true,
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

    const {
      location: { id: locationId, zip, country, city, building, street },
      ...restData
    } = updateCompanyDto;
    return this.databaseService.company.update({
      where: {
        id,
      },
      data: {
        ...restData,
        location: {
          update: {
            where: { id: locationId },
            data: {
              zip,
              city,
              country,
              building,
              street,
            },
          },
        },
      },
    });
  }

  async loadImage(
    companyId: number,
    fileName: string,
    fileType: string,
    file: Buffer,
    role: Role,
    sub: number,
  ) {
    const company = await this.findOne(companyId, role, sub);
    if (!company) {
      throw new NotFoundException('Current company not found');
    }
    const { url } = await this.uploadService.save(
      fileName,
      file,
      fileType,
      'company-avatar',
    );
    return this.databaseService.company.update({
      where: {
        id: companyId,
      },
      data: {
        avatar: url,
      },
    });
  }

  async updateImage(
    companyId: number,
    fileName: string,
    fileType: string,
    file: Buffer,
    role: Role,
    sub: number,
  ) {
    const company = await this.findOne(companyId, role, sub);
    if (!company) {
      throw new NotFoundException('Current company not found');
    }
    const fieldId = company.avatar;
    await this.uploadService.remove(fieldId, 'company-avatar');
    const { url } = await this.uploadService.save(
      fileName,
      file,
      fileName,
      'company-avatar',
    );

    return this.databaseService.company.update({
      where: {
        id: companyId,
      },
      data: {
        avatar: url,
      },
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

  async removeCompanyLogo(role: Role, sub: number, companyId: number) {
    const company = await this.findOne(companyId, role, sub);
    if (!company) {
      throw new NotFoundException('Current company not found');
    }
    await this.uploadService.remove(company.avatar, 'company-avatar');

    return this.databaseService.company.update({
      where: {
        id: companyId,
      },
      data: {
        avatar: null,
      },
    });
  }

  async getPaginationData(
    query: {
      searchByName?: string;
      searchByService?: string;
      sort?: keyof Pick<Company, 'createdDate' | 'capital'>;
      order?: 'asc' | 'desc';
      page?: number;
      limit?: number;
    },
    userId?: number,
  ) {
    const { page, limit, searchByName, searchByService, order, sort } = query;

    const skipItems = getSkippedItems(page, limit);
    const orderBy = [
      {
        [sort]: order,
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
          location: true,
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
