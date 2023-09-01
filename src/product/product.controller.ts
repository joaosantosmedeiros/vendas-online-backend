import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles-decorator';
import { UserType } from 'src/user/enum/userType-enum';
import { ProductService } from './product.service';
import { ReturnProductDto } from './dto/return-product-dto';
import { CreateProductDto } from './dto/create-product-dto';
import { Product } from '@prisma/client';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    const categories = await this.productService.findAll();

    return categories.map((product) => new ReturnProductDto(product));
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
}
