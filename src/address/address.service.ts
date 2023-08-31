import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAddressDto } from './dtos/create-address-dto';
import { Address } from './entities/addresss-entity';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    private prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<Address> {
    await this.userService.getUserById(userId);
    await this.cityService.getCityById(createAddressDto.city_id);
    return this.prismaService.address.create({
      data: {
        user_id: userId,
        ...createAddressDto,
      },
    });
  }
}
