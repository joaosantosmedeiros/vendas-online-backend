import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { PrismaService } from 'src/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 9000000000,
    }),
  ],
  controllers: [CityController],
  providers: [CityService, PrismaService],
})
export class CityModule {}
