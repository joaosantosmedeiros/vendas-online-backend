import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from './entities/product';
import { CreateProductDto } from './dto/create-product-dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDto } from './dto/update-product-dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(
    productsId?: number[],
    isFindRelations?: boolean,
  ): Promise<Product[]> {
    let findOptions = {};

    if (productsId && productsId.length > 0) {
      findOptions = {
        where: {
          id: { in: productsId },
        },
      };
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        include: { category: true },
        orderBy: { id: 'asc' },
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
      data: { ...updateProductDto },
      where: { id: product.id },
    });
  }

  async countProductsByCategoryId(category_id: number): Promise<number> {
    return this.prismaService.product.count({ where: { category_id } });
  }
}
