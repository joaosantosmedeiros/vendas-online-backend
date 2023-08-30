import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user-entity';
import { LoginDto } from './dtos/login-dto';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto): Promise<User> {
    const user: User = await this.userService
      .getUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = compareSync(
      loginDto.password,
      user?.password ?? `${loginDto.password}1`,
    );

    if (!user || !isMatch) {
      throw new NotFoundException('Incorrect email or password');
    }

    return user;
  }
}
