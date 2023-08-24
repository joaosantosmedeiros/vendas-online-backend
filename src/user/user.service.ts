import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './interfaces/user-interface';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = hashSync(createUserDto.password, saltOrRounds);

    const user: User = {
      id: this.users.length,
      ...createUserDto,
      password: hashedPassword,
    };

    this.users.push(user);

    return user;
  }
}
