import { Injectable } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from 'src/database/database.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationEntity } from './entities/location.entity';

@Injectable()
@ApiTags('locations')
export class LocationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  @ApiCreatedResponse({ type: LocationEntity })
  create(createLocationDto: CreateLocationDto) {
    return this.databaseService.location.create({ data: createLocationDto });
  }

  @ApiOkResponse({ type: LocationEntity, isArray: true })
  findAll(companyId: number) {
    return this.databaseService.location.findMany({
      where: {
        companyId,
      },
    });
  }

  @ApiOkResponse({ type: LocationEntity })
  findOne(id: number) {
    return this.databaseService.location.findUnique({
      where: {
        id,
      },
    });
  }

  @ApiOkResponse({ type: LocationEntity })
  update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.databaseService.location.update({
      where: {
        id,
      },
      data: updateLocationDto,
    });
  }

  @ApiOkResponse({ type: LocationEntity })
  remove(id: number) {
    return this.databaseService.location.delete({
      where: {
        id,
      },
    });
  }
}
