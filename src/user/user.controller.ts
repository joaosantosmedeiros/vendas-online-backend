import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UserService } from './user.service';
import { User } from './entities/user-entity';
import { ReturnUserDto } from './dtos/return-usser-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user) => new ReturnUserDto(user));
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
