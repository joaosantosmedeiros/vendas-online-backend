import { Address } from '../entities/addresss-entity';
import { ReturnCityDto } from 'src/city/dtos/return-city-dto';

export class ReturnAddressDto {
  complement: string;
  number: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(address: Address) {
    this.complement = address.complement;
    this.number = address.number;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
