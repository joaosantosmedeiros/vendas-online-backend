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
import { Order } from './entities/order';
import { ReturnOrderDto } from './dto/return-order-dto';

@Controller('order')
@Roles(UserType.User, UserType.Admin, UserType.Root)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findOrdersByUserId(@UserId() userId: number): Promise<Order[]> {
    return this.orderService.findOrdersByUserId(userId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('all')
  async findAllOrders(): Promise<ReturnOrderDto[]> {
    return (await this.orderService.findAllOrders()).map(
      (order) => new ReturnOrderDto(order),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get(':orderId')
  async findOrderById(
    @Param('orderId') orderId: number,
  ): Promise<ReturnOrderDto> {
    return new ReturnOrderDto(
      (await this.orderService.findOrdersById(Number(orderId)))[0],
    );
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
