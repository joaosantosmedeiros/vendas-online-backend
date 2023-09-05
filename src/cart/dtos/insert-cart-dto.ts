import { IsInt } from 'class-validator';

export class InsertCartDto {
  @IsInt()
  productId: number;

  @IsInt()
  amount: number;
}
