import { ReturnCepExternalDto } from './return-cep-external-dto';

export class ReturnCepDto {
  cep: string;
  publicPlace: string;
  complement: string;
  neighbourhood: string;
  city: string;
  uf: string;
  ddd: string;
  cityId?: number;
  stateId: number;

  constructor(
    returnCep: ReturnCepExternalDto,
    cityId?: number,
    stateId?: number,
  ) {
    this.cep = returnCep.cep;
    this.publicPlace = returnCep.logradouro;
    this.complement = returnCep.complemento;
    this.neighbourhood = returnCep.bairro;
    this.city = returnCep.localidade;
    this.uf = returnCep.uf;
    this.ddd = returnCep.ddd;
    this.cityId = cityId;
    this.stateId = stateId;
  }
}
