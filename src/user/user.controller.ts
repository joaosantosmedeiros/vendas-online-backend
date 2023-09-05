import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UserService } from './user.service';
import { User } from './entities/user-entity';
import { ReturnUserDto } from './dtos/return-user-dto';
import { UpdatePasswordDto } from './dtos/update-password-dto';
import { UserId } from 'src/decorators/user-id-decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByIdUsingRelations(Number(userId)),
    );
  }

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

  @Patch()
  @UsePipes(ValidationPipe)
  async updateUserPassword(
    @UserId() userId: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return this.userService.updatePassword(updatePasswordDto, userId);
  }
}
