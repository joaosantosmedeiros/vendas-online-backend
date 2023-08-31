import { State } from '../../state/entities/state-entity';

export interface City {
  id: number;
  name: string;
  state_id: number;
  state?: State;
  createdAt: Date;
  updatedAt: Date;
}
