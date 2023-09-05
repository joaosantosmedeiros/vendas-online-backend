import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertCartDto } from './dtos/insert-cart-dto';
import { Cart } from './entities/cart-entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async verifyActiveCart(userId: number): Promise<Cart> {
    const cart: Cart = await this.prismaService.cart.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found.');
    }

    return cart;
  }

  async createCart(userId: number): Promise<Cart> {
    return this.prismaService.cart.create({
      data: {
        active: true,
        user_id: userId,
      },
    });
  }

  async insertProductInCart(
    insertCartDto: InsertCartDto,
    userId: number,
  ): Promise<Cart> {
    const cart = await this.verifyActiveCart(userId).catch(async () =>
      this.createCart(userId),
    );

    return cart;
  }
}
