import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaService } from '../prisma.service';
import { CityModule } from '../city/city.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaService],
  imports: [CityModule, UserModule],
  exports: [AddressService],
})
export class AddressModule {}
