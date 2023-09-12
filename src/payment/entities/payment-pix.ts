import { CreateOrderDto } from 'src/order/dto/create-order-dto';
import { Payment } from './payment';

export class PaymentPix extends Payment {
  code: string;
  payment_date: Date;

  constructor(
    status_id: number,
    price: number,
    discount: number,
    final_price: number,
    createOrderDto: CreateOrderDto,
  ) {
    super(status_id, price, discount, final_price);
    this.code = createOrderDto?.pixCode || '';
    this.payment_date = new Date(createOrderDto?.paymentDate || '');
  }
}
