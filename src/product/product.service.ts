import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from './entities/product';
import { CreateProductDto } from './dto/create-product-dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDto } from './dto/update-product-dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(productsId?: number[]): Promise<Product[]> {
    let findOptions = {};

    if (productsId && productsId.length > 0) {
      findOptions = {
        where: {
          id: { in: productsId },
        },
      };
    }

    const products = await this.prismaService.product.findMany(findOptions);

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found.');
    }

    return products;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.categoryService.findCategoryById(createProductDto.category_id);

    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async delete(id: number): Promise<void> {
    await this.findProductById(id);
    await this.prismaService.product.delete({
      where: { id },
    });
  }

  async updateProduct(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findProductById(productId);
    await this.categoryService.findCategoryById(updateProductDto.category_id);
    return await this.prismaService.product.update({
      data: { ...product, ...updateProductDto },
      where: { id: product.id },
    });
  }
}
