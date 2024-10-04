import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createLocationDto: CreateLocationDto) {
    return this.databaseService.location.create({ data: createLocationDto });
  }

  findAll(companyId: number) {
    return this.databaseService.location.findMany({
      where: {
        companyId,
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.location.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.databaseService.location.update({
      where: {
        id,
      },
      data: updateLocationDto,
    });
  }

  remove(id: number) {
    return this.databaseService.location.delete({
      where: {
        id,
      },
    });
  }
}
