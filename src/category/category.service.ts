import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dtos/create-category-dto';
import { Category } from './entities/category';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllCategories(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany({
      include: {
        _count: {
          select: { Product: true },
        },
      },
    });

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories not found.');
    }

    return categories;
  }

  async findCategoryById(id: number): Promise<Category> {
    const category = await this.prismaService.category.findFirst({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findCategoryByName(name: string): Promise<Category> {
    const category = this.prismaService.category.findFirst({
      where: {
        name,
      },
    });

    if (category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.findCategoryByName(
      createCategoryDto.name,
    ).catch(() => undefined);

    if (category) {
      throw new BadRequestException('Category already exists');
    }

    return this.prismaService.category.create({
      data: createCategoryDto,
    });
  }
}
