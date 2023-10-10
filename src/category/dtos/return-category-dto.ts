import { ReturnProductDto } from 'src/product/dto/return-product-dto';
import { Category } from '../entities/category';

export class ReturnCategoryDto {
  id: number;
  name: string;
  productsAmount: number;
  Product?: ReturnProductDto[];

  constructor(category: Category) {
    this.name = category.name;
    this.id = category.id;
    this.productsAmount = category._count?.Product
      ? category._count.Product
      : 0;
    this.Product = category.Product
      ? category.Product.map((product) => new ReturnProductDto(product))
      : undefined;
  }
}
