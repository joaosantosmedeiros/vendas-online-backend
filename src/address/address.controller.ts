import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address-dto';
import { AddressService } from './address.service';
import { Address } from './entities/addresss-entity';
import { Roles } from '../decorators/roles-decorator';
import { UserType } from '../user/enum/userType-enum';
import { UserId } from '../decorators/user-id-decorator';
import { ReturnAddressDto } from './dtos/return-address-dto';

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<Address> {
    userId = Number(userId);
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Get()
  async getAddressByUserId(
    @UserId() userId: number,
  ): Promise<ReturnAddressDto[]> {
    userId = Number(userId);
    const addresses = await this.addressService.getAddressByUserId(userId);
    return addresses.map((address) => new ReturnAddressDto(address));
    return addresses;
  }
}
