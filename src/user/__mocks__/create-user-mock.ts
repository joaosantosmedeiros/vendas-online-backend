import { CreateUserDto } from '../dtos/create-user-dto';
import { UserType } from '../enum/userType-enum';

export const createUserMock: CreateUserDto = {
  cpf: 'any_cpf',
  name: 'any_name',
  password: 'any_password',
  phone: 'any_phone',
  userType: UserType.User,
  email: 'mail@mail.com',
};
