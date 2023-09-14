import { Address } from 'src/address/entities/addresss-entity';
import { OrderProduct } from 'src/order-product/entities/order-product';
import { Payment } from 'src/payment/entities/payment';
import { User } from 'src/user/entities/user-entity';

export class Order {
  id: number;
  user_id: number;
  user?: User;
  address?: Address;
  address_id: number;
  date: Date;
  payment_id: number;
  payment?: Payment;
  OrderProduct?: OrderProduct[];
  updatedAt: Date;
  createdAt: Date;
}
