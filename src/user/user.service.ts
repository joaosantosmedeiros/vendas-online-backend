import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './entities/user-entity';
import { hashSync } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { UserType } from './enum/userType-enum';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email not found.');
    }

    return user;
  }

  async getUserByIdUsingRelations(userId: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        Address: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
      },
    });
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany({});
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.getUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException('Email in use.');
    }

    const saltOrRounds = 10;
    const hashedPassword = hashSync(createUserDto.password, saltOrRounds);

    const raw = {
      ...createUserDto,
      password: hashedPassword,
      userType: UserType.User,
    };

    return await this.prismaService.user.create({
      data: raw,
    });
  }
}
