import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  address_id: number;

  @IsOptional()
  @IsNumber()
  amount_payments?: number;

  @IsOptional()
  @IsString()
  pixCode?: string;

  @IsOptional()
  @IsString()
  paymentDate?: string;
}
