import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaService } from 'src/prisma.service';
import { CityModule } from 'src/city/city.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaService],
  imports: [CityModule, UserModule],
})
export class AddressModule {}
