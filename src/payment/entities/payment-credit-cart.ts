import { CreateOrderDto } from 'src/order/dto/create-order-dto';
import { Payment } from './payment';

export class PaymentCreditCard extends Payment {
  amount_payments: number;

  constructor(
    status_id: number,
    price: number,
    discount: number,
    final_price: number,
    createOrderDto: CreateOrderDto,
  ) {
    super(status_id, price, discount, final_price);
    this.amount_payments = createOrderDto?.amount_payments || 0;
  }
}
