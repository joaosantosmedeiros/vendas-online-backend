import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InsertCartDto } from './dtos/insert-cart-dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id-decorator';
import { UserType } from 'src/user/enum/userType-enum';
import { Roles } from 'src/decorators/roles-decorator';
import { ReturnCartDto } from './dtos/return-cart-dto';

@Roles(UserType.Admin, UserType.User)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findCartByUserId(@UserId() userId: number): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.findCartByUserID(userId, true),
    );
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createCart(
    @Body() insertCartDto: InsertCartDto,
    @UserId() userId: number,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.insertProductInCart(insertCartDto, Number(userId)),
    );
  }

  @Delete()
  @HttpCode(204)
  async clearCart(@UserId() userId: number) {
    return this.cartService.clearCart(userId);
  }
}
