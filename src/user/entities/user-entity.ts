import { Address } from 'src/address/entities/addresss-entity';

export class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  Address?: Address[];
  userType: number;
}
