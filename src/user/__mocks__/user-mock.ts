import { User } from '../entities/user-entity';
import { UserType } from '../enum/userType-enum';

export const userEntityMock: User = {
  cpf: 'any_cpf',
  createdAt: new Date(),
  id: 4342,
  name: 'any_name',
  password: 'any_password',
  phone: 'any_phone',
  userType: UserType.User,
  updatedAt: new Date(),
  email: 'mail@mail.com',
};
