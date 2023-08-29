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

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':userId')
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
