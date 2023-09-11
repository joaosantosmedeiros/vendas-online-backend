import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertCartDto } from 'src/cart/dtos/insert-cart-dto';
import { Cart } from 'src/cart/entities/cart-entity';
import { PrismaService } from 'src/prisma.service';
import { CartProduct } from './entities/cart-product-entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product';

@Injectable()
export class CartProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProduct> {
    const cartProduct = await this.prismaService.cartProduct.findFirst({
      where: {
        cart_id: cartId,
        product_id: productId,
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }

    return cartProduct;
  }

  async createProductInCart(
    insertCartDto: InsertCartDto,
    cartId: number,
  ): Promise<CartProduct> {
    const product: Product = await this.productService.findProductById(
      insertCartDto.productId,
    );

    return this.prismaService.cartProduct.create({
      data: {
        amount: insertCartDto.amount,
        cart: { connect: { id: cartId } },
        product: { connect: { id: product.id } },
      },
    });
  }

  async insertProductInCart(
    insertCartDto: InsertCartDto,
    cart: Cart,
  ): Promise<CartProduct> {
    const cartProduct: CartProduct = await this.verifyProductInCart(
      insertCartDto.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createProductInCart(insertCartDto, cart.id);
    }

    const amount = cartProduct.amount + insertCartDto.amount;

    return this.prismaService.cartProduct.update({
      data: { amount },
      where: { id: cartProduct.id, cart_id: cart.id },
    });
  }
}
