import { IsInt } from 'class-validator';

export class UpdateCartDto {
  @IsInt()
  productId: number;

  @IsInt()
  amount: number;
}
