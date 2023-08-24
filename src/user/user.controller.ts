import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return {
      ...createUserDto,
      password: undefined,
    };
  }
}
