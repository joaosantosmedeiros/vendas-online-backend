import { User } from 'src/user/entities/user-entity';

export class Order {
  id: number;
  user_id: number;
  user?: User;
  address_id: number;
  date: Date;
  payment_id: number;
  updatedAt: Date;
  createdAt: Date;
}
