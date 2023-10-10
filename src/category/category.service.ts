import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dtos/create-category-dto';
import { Category } from './entities/category';
import { UpdateCategoryDto } from './dtos/update-category-dto';

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

  async findCategoryById(id: number, isRelation?: boolean): Promise<Category> {
    const relations = isRelation
      ? {
          Product: true,
          _count: {
            select: { Product: true },
          },
        }
      : undefined;

    const category = await this.prismaService.category.findFirst({
      where: {
        id,
      },
      include: relations,
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

  async editCategory(
    categoryId: number,
    updateCategory: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findCategoryById(categoryId);

    return this.prismaService.category.update({
      where: { id: category.id },
      data: updateCategory,
      include: {
        _count: {
          select: { Product: true },
        },
      },
    });
  }

  async deleteCategory(id: number) {
    const category = await this.findCategoryById(id, true);

    if (category.Product.length != 0) {
      throw new BadRequestException('Category have relations.');
    }

    await this.prismaService.category.delete({
      where: { id: category.id },
    });
  }
}
