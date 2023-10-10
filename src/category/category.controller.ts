import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/return-category-dto';
import { Roles } from 'src/decorators/roles-decorator';
import { UserType } from 'src/user/enum/userType-enum';
import { CreateCategoryDto } from './dtos/create-category-dto';
import { Category } from './entities/category';

@Roles(UserType.Admin, UserType.Root, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategoryDto[]> {
    const categories = await this.categoryService.findAllCategories();

    return categories.map((category) => new ReturnCategoryDto(category));
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: number): Promise<void> {
    return this.categoryService.deleteCategory(Number(categoryId));
  }
}
