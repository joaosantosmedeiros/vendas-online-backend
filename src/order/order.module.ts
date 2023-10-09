import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { PaymentModule } from 'src/payment/payment.module';
import { CartModule } from 'src/cart/cart.module';
import { OrderProductModule } from 'src/order-product/order-product.module';
import { ProductModule } from 'src/product/product.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  providers: [OrderService, PrismaService],
  controllers: [OrderController],
  imports: [
    PaymentModule,
    CartModule,
    OrderProductModule,
    ProductModule,
    AddressModule,
  ],
})
export class OrderModule {}
