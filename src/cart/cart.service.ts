import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertCartDto } from './dtos/insert-cart-dto';
import { Cart } from './entities/cart-entity';
import { PrismaService } from 'src/prisma.service';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { UpdateCartDto } from './dtos/update-cart-dto';

@Injectable()
export class CartService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cartProductService: CartProductService,
  ) {}

  async findCartByUserID(userId: number, isIncluded?: boolean): Promise<Cart> {
    const include =
      isIncluded == true
        ? { CartProduct: { include: { product: true } } }
        : undefined;

    const cart: Cart = await this.prismaService.cart.findFirst({
      where: {
        user_id: userId,
        active: true,
      },
      include,
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
    const cart = await this.findCartByUserID(userId).catch(async () =>
      this.createCart(userId),
    );

    await this.cartProductService.insertProductInCart(insertCartDto, cart);

    return cart;
  }

  async clearCart(userId: number): Promise<boolean> {
    const cart = await this.findCartByUserID(userId, true);
    await this.prismaService.cart.update({
      where: { id: cart.id },
      data: {
        active: false,
      },
    });

    return true;
  }

  async deleteProductCart(userId: number, productId: number) {
    const cart = await this.findCartByUserID(userId);

    return this.cartProductService.deleteProductCart(productId, cart.id);
  }

  async updateProductInCart(
    updateCartDto: UpdateCartDto,
    userId: number,
  ): Promise<Cart> {
    const cart = await this.findCartByUserID(userId).catch(async () =>
      this.createCart(userId),
    );

    await this.cartProductService.updateProductInCart(updateCartDto, cart);

    return cart;
  }
}
