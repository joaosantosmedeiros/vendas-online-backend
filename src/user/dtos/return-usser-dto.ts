import { User } from '../entities/user-entity';

export class ReturnUserDto {
  constructor(userEntity: User) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
  }

  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}
