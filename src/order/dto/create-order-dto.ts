import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
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
