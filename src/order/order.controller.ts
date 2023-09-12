import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { OrderService } from './order.service';
import { UserId } from 'src/decorators/user-id-decorator';
import { Roles } from 'src/decorators/roles-decorator';
import { UserType } from 'src/user/enum/userType-enum';

@Controller('order')
@Roles(UserType.User, UserType.Admin)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findOrdersByUserId(@UserId() userId: number) {
    return this.orderService.findOrdersByUserId(userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Param('cartId') cartId: number,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrder(createOrderDto, userId);
  }
}
