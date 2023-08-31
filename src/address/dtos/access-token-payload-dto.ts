import { User } from '../../user/entities/user-entity';

export class AccessTokenPayload {
  constructor(user: User) {
    this.id = user.id;
    this.userType = user.userType;
  }

  id: number;
  userType: number;
}
