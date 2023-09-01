import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from './entities/product';
import { CreateProductDto } from './dto/create-product-dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany({});
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.categoryService.findCategoryById(createProductDto.category_id);

    return this.prismaService.product.create({
      data: createProductDto,
    });
  }
}
