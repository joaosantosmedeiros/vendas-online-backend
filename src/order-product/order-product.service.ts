import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderProduct } from './entities/order-product';

@Injectable()
export class OrderProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrderProduct(
    product_id: number,
    order_id: number,
    amount: number,
    price: number,
  ): Promise<OrderProduct> {
    return this.prismaService.orderProduct.create({
      data: {
        amount,
        order_id,
        product_id,
        price,
      },
    });
  }
}
