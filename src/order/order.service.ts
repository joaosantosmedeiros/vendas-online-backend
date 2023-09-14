import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/entities/payment';
import { Order } from './entities/order';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { ProductService } from 'src/product/product.service';
import { Cart } from 'src/cart/entities/cart-entity';
import { Product } from 'src/product/entities/product';
import { OrderProduct } from 'src/order-product/entities/order-product';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
  ) {}

  async saveOrder(
    createOrderDto: CreateOrderDto,
    payment: Payment,
    user_id: number,
  ): Promise<Order> {
    return this.prismaService.order.create({
      data: {
        address_id: createOrderDto.address_id,
        date: new Date(),
        payment_id: payment.id,
        user_id,
      },
    });
  }

  async createOrderProductsUsingCart(
    cart: Cart,
    orderId: number,
    products: Product[],
  ): Promise<OrderProduct[]> {
    return Promise.all(
      cart.CartProduct?.map((cartProduct) =>
        this.orderProductService.createOrderProduct(
          cartProduct.product_id,
          orderId,
          cartProduct.amount,
          products.find((product) => product.id == cartProduct.product_id)
            ?.price || 0,
        ),
      ),
    );
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<Order> {
    const cart = await this.cartService.findCartByUserID(userId, true);

    const products = await this.productService.findAll(
      cart.CartProduct?.map((cartProduct) => cartProduct.product_id),
    );

    const payment: Payment = await this.paymentService.createPayment(
      createOrderDto,
      products,
      cart,
    );

    const order = await this.saveOrder(createOrderDto, payment, userId);

    await this.createOrderProductsUsingCart(cart, order.id, products);

    await this.cartService.clearCart(userId);

    return order;
  }

  async findOrdersByUserId(userId: number): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      where: {
        user_id: userId,
      },
      include: {
        address: true,
        OrderProduct: { include: { product: true } },
        payment: { include: { payment_status: true } },
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException('Orders not found.');
    }

    return orders;
  }

  async findOrdersById(orderId?: number, userId?: number): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      where: {
        id: orderId,
        user_id: userId,
      },
      include: {
        address: true,
        OrderProduct: { include: { product: true } },
        payment: { include: { payment_status: true } },
        user: !!orderId,
      },
    });

    if (!orders) {
      throw new NotFoundException('Orders not found.');
    }

    return orders;
  }

  async findAllOrders(): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      include: {
        user: true,
        _count: { select: { OrderProduct: true } },
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException('Orders not found.');
    }

    const ordersWithRenamedCount = orders.map((order) => {
      const {
        user,
        _count: { OrderProduct: count },
        ...rest
      } = order;
      return { user, productsAmount: count, ...rest };
    });

    return ordersWithRenamedCount;
  }
}
