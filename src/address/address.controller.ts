import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address-dto';
import { AddressService } from './address.service';
import { Address } from './entities/addresss-entity';
import { Roles } from 'src/decorators/roles-decorator';
import { UserType } from 'src/user/enum/userType-enum';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':userId')
  @Roles(UserType.User)
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @Param('userId') userId: number,
  ): Promise<Address> {
    return await this.addressService.createAddress(
      createAddressDto,
      Number(userId),
    );
  }
}
