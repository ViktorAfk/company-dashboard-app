import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricesService {
  constructor(private readonly databaseService: DatabaseService) {}
  createMany(createPriceDto: CreatePriceDto[]) {
    return this.databaseService.price.createMany({ data: createPriceDto });
  }

  findAll(companyId: number) {
    return this.databaseService.price.findMany({
      where: {
        companyId,
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.price.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updatePriceDto: UpdatePriceDto) {
    return this.databaseService.price.update({
      where: {
        id,
      },
      data: updatePriceDto,
    });
  }

  remove(id: number) {
    return this.databaseService.price.delete({
      where: {
        id,
      },
    });
  }
}
