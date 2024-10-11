import { PickType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/dto/query-params.dto';

export class QueryUsersDTO extends PickType(QueryDto, [
  'limit',
  'page',
] as const) {}
