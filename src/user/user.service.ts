import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './entities/user-entity';
import { hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany({});
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = hashSync(createUserDto.password, saltOrRounds);

    const raw = {
      ...createUserDto,
      password: hashedPassword,
    };

    const user = await this.prismaService.user.create({
      data: raw,
    });

    return user;
  }
}
