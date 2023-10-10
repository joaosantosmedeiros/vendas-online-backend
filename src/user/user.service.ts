import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './entities/user-entity';
import { PrismaService } from '../prisma.service';
import { UserType } from './enum/userType-enum';
import { UpdatePasswordDto } from './dtos/update-password-dto';
import { createHashedPassword } from 'src/utils/hash-password';
import { validatePassword } from 'src/utils/validate-password';

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

  async createUser(
    createUserDto: CreateUserDto,
    userType?: number,
  ): Promise<User> {
    const user = await this.getUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException('Email in use.');
    }

    if (createUserDto.confirmationPassword !== createUserDto.password) {
      throw new BadRequestException("Passwords don't match.");
    }

    const hashedPassword = await createHashedPassword(createUserDto.password);

    const raw = {
      ...createUserDto,
      password: hashedPassword,
      userType: userType ? userType : UserType.User,
      confirmationPassword: undefined,
    };

    return await this.prismaService.user.create({
      data: raw,
    });
  }

  async updatePassword(
    updatePasswordDto: UpdatePasswordDto,
    userId: number,
  ): Promise<User> {
    if (userId === undefined) {
      throw new BadRequestException('Invalid userId.');
    }

    const user = await this.getUserById(userId);

    const isMatch = await validatePassword(
      updatePasswordDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Invalid password.');
    }

    if (
      updatePasswordDto.newPassword !== updatePasswordDto.confirmationPassword
    ) {
      throw new BadRequestException("Passwords don't match.");
    }

    const hashedPassword = await createHashedPassword(
      updatePasswordDto.newPassword,
    );

    return this.prismaService.user.update({
      data: { password: hashedPassword },
      where: { id: user.id },
    });
  }
}
