import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from '../models';

export class UpdateCartDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  items: CartItem[];
}
