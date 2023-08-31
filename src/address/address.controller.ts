import {
  Body,
  Controller,
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

@Roles(UserType.User)
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
}
