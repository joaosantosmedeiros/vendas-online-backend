import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}
