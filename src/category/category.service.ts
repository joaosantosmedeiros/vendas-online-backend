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
    return this.prismaService.category.findMany({});
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
