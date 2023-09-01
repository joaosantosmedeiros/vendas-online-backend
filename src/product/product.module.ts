import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule],
  providers: [ProductService, PrismaService],
  controllers: [ProductController],
})
export class ProductModule {}
