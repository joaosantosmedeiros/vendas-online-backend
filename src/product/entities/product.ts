import { Cart } from 'src/cart/entities/cart-entity';
import { Category } from 'src/category/entities/category';

export class Product {
  id: number;
  category_id: number;
  category?: Category;
  name: string;
  price: number;
  image: string;
  cartProduct?: Cart[];
  createdAt: Date;
  updatedAt: Date;
}
