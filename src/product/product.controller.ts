import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles-decorator';
import { UserType } from 'src/user/enum/userType-enum';
import { ProductService } from './product.service';
import { ReturnProductDto } from './dto/return-product-dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    const categories = await this.productService.findAll();

    return categories.map((product) => new ReturnProductDto(product));
  }
}
