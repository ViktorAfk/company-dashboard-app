import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class UpdatePriceDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @ApiProperty()
  price: number;

  @IsOptional()
  @ApiProperty()
  date: string;
}
