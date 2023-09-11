import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { PrismaService } from 'src/prisma.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ProductModule],
  providers: [CartProductService, PrismaService],
  exports: [CartProductService],
})
export class CartProductModule {}
