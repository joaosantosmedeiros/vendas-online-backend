import { City } from '../../city/entities/city-entity';

export interface Address {
  id: number;
  user_id: number;
  complement: string;
  number: number;
  cep: string;
  city_id: number;
  city?: City;
  createdAt: Date;
  updatedAt: Date;
}
