import { Cart } from 'src/cart/entities/cart-entity';
import { Product } from 'src/product/entities/product';

export class CartProduct {
  id: number;
  cart_id: number;
  cart?: Cart;
  product_id: number;
  product?: Product;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
