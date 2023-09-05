import { CartProduct } from 'src/cart-product/entities/cart-product-entity';

export class Cart {
  id: number;
  user_id: number;
  cartProduct?: CartProduct;
  createdAt: Date;
  updatedAt: Date;
}
