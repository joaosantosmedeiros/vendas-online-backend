import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { City } from './entities/city-entity';
import { CreateCityDto } from './dtos/create-city-dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllCitiesByStateId(state_id: number): Promise<City[]> {
    const citiesCache: City[] = await this.cacheManager.get(
      `state_${state_id}`,
    );

    if (citiesCache) {
      return citiesCache;
    }

    const cities = await this.prismaService.city.findMany({
      where: {
        state_id,
      },
    });

    await this.cacheManager.set(`state_${state_id}`, cities);

    return cities;
  }

  async create(data: CreateCityDto): Promise<City> {
    return this.prismaService.city.create({
      data,
    });
  }
}
