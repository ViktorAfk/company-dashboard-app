import { PickType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/dto/query-params.dto';

export class QueryDashBoardUserCompaniesDTO extends PickType(QueryDto, [
  'page',
  'limit',
  'searchByName',
] as const) {}
