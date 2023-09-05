import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/entities/user-entity';
import { LoginDto } from './dtos/login-dto';
import { UserService } from '../user/user.service';
import { ReturnLoginDto } from './dtos/return-login-dto';
import { ReturnUserDto } from '../user/dtos/return-user-dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from '../address/dtos/access-token-payload-dto';
import { validatePassword } from 'src/utils/validate-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user: User = await this.userService
      .getUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      loginDto.password,
      user?.password ?? `${loginDto.password}1`,
    );

    if (!user || !isMatch) {
      throw new NotFoundException('Incorrect email or password');
    }

    return {
      accessToken: this.jwtService.sign({ ...new AccessTokenPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
