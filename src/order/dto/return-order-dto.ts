import { ReturnUserDto } from 'src/user/dtos/return-user-dto';
import { Order } from '../entities/order';

export class ReturnOrderDto {
  id: number;
  date: string;
  user?: ReturnUserDto;

  constructor(order: Order) {
    this.id = order.id;
    this.date = order.date.toString();
    this.user = order.user ? new ReturnUserDto(order.user) : undefined;
  }
}
