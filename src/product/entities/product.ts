import { Cart } from 'src/cart/entities/cart-entity';

export class Product {
  id: number;
  category_id: number;
  name: string;
  price: number;
  image: string;
  cartProduct?: Cart[];
  createdAt: Date;
  updatedAt: Date;
}
