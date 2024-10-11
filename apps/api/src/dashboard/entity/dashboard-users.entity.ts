import { ApiProperty } from '@nestjs/swagger';
import { MetaData } from 'src/common/entity/response.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class DashBoardUserEntity {
  @ApiProperty({ isArray: true })
  data: UserEntity;

  @ApiProperty()
  meta: MetaData;
}
