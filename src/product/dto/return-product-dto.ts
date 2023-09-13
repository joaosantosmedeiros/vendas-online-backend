import { ReturnCategoryDto } from 'src/category/dtos/return-category-dto';
import { Product } from '../entities/product';

export class ReturnProductDto {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: ReturnCategoryDto;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
    this.category = product.category
      ? new ReturnCategoryDto(product.category)
      : undefined;
  }
}
