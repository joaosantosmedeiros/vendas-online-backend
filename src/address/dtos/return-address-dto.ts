import { Address } from '../entities/addresss-entity';
import { ReturnCityDto } from '../../city/dtos/return-city-dto';

export class ReturnAddressDto {
  id: number;
  complement: string;
  number: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(address: Address) {
    this.id = address.id;
    this.complement = address.complement;
    this.number = address.number;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
