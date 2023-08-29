import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAddressDto } from './dtos/create-address-dto';
import { Address } from './entities/addresss-entity';

@Injectable()
export class AddressService {
  constructor(private prismaService: PrismaService) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<Address> {
    return this.prismaService.address.create({
      data: {
        user_id: userId,
        ...createAddressDto,
      },
    });
  }
}
