import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from './entities/product';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany({});
  }
}
