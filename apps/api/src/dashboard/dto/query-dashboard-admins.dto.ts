import { OmitType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/dto/query-params.dto';

export class QueryCompanyAdminsDto extends OmitType(QueryDto, [
  'searchByService',
  'sortByCreatedDate',
] as const) {}
