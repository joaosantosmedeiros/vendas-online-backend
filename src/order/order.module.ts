import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { PaymentModule } from 'src/payment/payment.module';
import { CartModule } from 'src/cart/cart.module';
import { OrderProductModule } from 'src/order-product/order-product.module';

@Module({
  providers: [OrderService, PrismaService],
  controllers: [OrderController],
  imports: [PaymentModule, CartModule, OrderProductModule],
})
export class OrderModule {}
