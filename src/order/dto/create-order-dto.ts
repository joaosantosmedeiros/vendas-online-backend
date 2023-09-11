import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsNumber()
  amount_payments?: number;

  @IsOptional()
  @IsString()
  pixCode?: number;

  @IsOptional()
  @IsString()
  paymentDate?: string;
}
