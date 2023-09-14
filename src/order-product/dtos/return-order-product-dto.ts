import { ReturnProductDto } from 'src/product/dto/return-product-dto';
import { OrderProduct } from '../entities/order-product';

export class ReturnOrderProductDto {
  id: number;
  order_id: number;
  product_id: number;
  amount: number;
  price: number;
  product?: ReturnProductDto;

  constructor(orderProduct: OrderProduct) {
    this.id = orderProduct.id;
    this.order_id = orderProduct.order_id;
    this.product_id = orderProduct.product_id;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.product = orderProduct.product
      ? new ReturnProductDto(orderProduct.product)
      : undefined;
  }
}
