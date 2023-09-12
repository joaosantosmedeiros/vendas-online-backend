import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/entities/payment';
import { Order } from './entities/order';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    cartId: number,
    userId: number,
  ): Promise<Order> {
    const payment: Payment =
      await this.paymentService.createPayment(createOrderDto);

    const order = await this.prismaService.order.create({
      data: {
        address_id: createOrderDto.address_id,
        date: new Date(),
        payment_id: payment.id,
        user_id: userId,
      },
    });

    const cart = await this.cartService.findCartByUserID(userId, true);

    const products = await this.productService.findAll(
      cart.CartProduct?.map((cartProduct) => cartProduct.product_id),
    );

    await Promise.all(
      cart.CartProduct?.map((cartProduct) =>
        this.orderProductService.createOrderProduct(
          cartProduct.product_id,
          order.id,
          cartProduct.amount,
          products.find((product) => product.id == cartProduct.product_id)
            ?.price || 0,
        ),
      ),
    );

    return order;
  }
}
