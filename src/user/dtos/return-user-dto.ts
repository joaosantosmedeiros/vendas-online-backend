import { User } from '../entities/user-entity';
import { ReturnAddressDto } from '../../address/dtos/return-address-dto';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ReturnAddressDto[];

  constructor(userEntity: User) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;

    this.addresses = userEntity.Address
      ? userEntity.Address.map((address) => new ReturnAddressDto(address))
      : undefined;
  }
}
