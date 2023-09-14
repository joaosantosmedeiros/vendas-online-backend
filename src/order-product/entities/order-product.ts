import { Product } from 'src/product/entities/product';

export class OrderProduct {
  id: number;
  order_id: number;
  product_id: number;
  product?: Product;
  amount: number;
  price: number;
  updatedAt: Date;
  createdAt: Date;
}
