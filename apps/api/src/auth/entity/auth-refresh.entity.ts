import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
