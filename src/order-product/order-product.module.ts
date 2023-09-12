import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OrderProductService, PrismaService],
  exports: [OrderProductService],
})
export class OrderProductModule {}
