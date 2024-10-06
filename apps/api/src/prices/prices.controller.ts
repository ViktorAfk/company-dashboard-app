import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PriceEntity } from './entities/price.entity';
import { PricesService } from './prices.service';

@Controller('prices')
@ApiTags('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  @ApiCreatedResponse({ type: PriceEntity })
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.create(createPriceDto);
  }

  @Get()
  @ApiOkResponse({ type: PriceEntity, isArray: true })
  findAll(companyId: string) {
    return this.pricesService.findAll(+companyId);
  }

  @Get(':id')
  @ApiOkResponse({ type: PriceEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PriceEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePriceDto: UpdatePriceDto,
  ) {
    return this.pricesService.update(id, updatePriceDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PriceEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.remove(id);
  }
}
