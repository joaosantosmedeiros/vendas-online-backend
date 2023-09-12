import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  providers: [OrderService, PrismaService],
  controllers: [OrderController],
  imports: [PaymentModule],
})
export class OrderModule {}
