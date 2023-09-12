import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma.service';
import { CartProductModule } from 'src/cart-product/cart-product.module';

@Module({
  imports: [CartProductModule],
  providers: [CartService, PrismaService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
