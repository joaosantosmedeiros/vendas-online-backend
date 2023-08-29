import { Address } from '../entities/addresss-entity';

export class ReturnAddressDto {
  complement: string;
  number: number;
  cep: string;

  constructor(address: Address) {
    this.complement = address.complement;
    this.number = address.number;
    this.cep = address.cep;
  }
}
