import { Category } from '../entities/category';

export class ReturnCategoryDto {
  id: number;
  name: string;
  productsAmount?: number;

  constructor(category: Category) {
    this.name = category.name;
    this.id = category.id;
    this.productsAmount = category._count?.Product
      ? category._count.Product
      : undefined;
  }
}
