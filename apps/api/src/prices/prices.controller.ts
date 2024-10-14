import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PriceEntity } from './entities/price.entity';
import { PricesService } from './prices.service';

@Controller('prices')
@ApiTags('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  @Roles('USER')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PriceEntity })
  create(@Body() createPriceDto: CreatePriceDto[]) {
    return this.pricesService.createMany(createPriceDto);
  }

  // @Get('companies/:companyId')
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: PriceEntity, isArray: true })
  // findAll(@Param('') companyId: string) {
  //   return this.pricesService.findAll(+companyId);
  // }

  @Roles('USER', 'ADMIN', 'SUPER_ADMIN')
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PriceEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.findOne(+id);
  }

  @Roles('USER')
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: PriceEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePriceDto: UpdatePriceDto,
  ) {
    return this.pricesService.update(id, updatePriceDto);
  }

  @Roles('USER')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: PriceEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.remove(id);
  }
}
