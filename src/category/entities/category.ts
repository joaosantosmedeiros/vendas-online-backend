import { Product } from 'src/product/entities/product';

export class Category {
  id: number;
  name: string;
  _count?: { Product: number };
  Product?: Product[];
  createdAt: Date;
  updatedAt: Date;
}
