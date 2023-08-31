import { User } from '../../user/entities/user-entity';

export class LoginPayload {
  id: number;
  userType: number;

  constructor(user: User) {
    this.id = user.id;
    this.userType = user.userType;
  }
}
