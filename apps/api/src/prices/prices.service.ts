import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricesService {
  constructor(private readonly databaseService: DatabaseService) {}
  createPrice(createPriceDto: CreatePriceDto) {
    return this.databaseService.price.create({ data: createPriceDto });
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

  async update(id: number, updatePriceDto: UpdatePriceDto) {
    const price = await this.findOne(id);
    if (!price) {
      throw new NotFoundException('Price not found');
    }
    return this.databaseService.price.update({
      where: {
        id,
      },
      data: updatePriceDto,
    });
  }

  async remove(id: number) {
    const price = await this.findOne(id);
    if (!price) {
      throw new NotFoundException('Price not found');
    }
    return this.databaseService.price.delete({
      where: {
        id,
      },
    });
  }
}
