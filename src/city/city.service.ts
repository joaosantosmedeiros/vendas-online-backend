import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { City } from './entities/city-entity';
import { CreateCityDto } from './dtos/create-city-dto';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  async getCityById(cityId: number): Promise<City> {
    const city = await this.prismaService.city.findUnique({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      throw new NotFoundException('City not found.');
    }

    return city;
  }

  async getAllCitiesByStateId(state_id: number): Promise<City[]> {
    return this.cacheService.getCache<City[]>(`state_${state_id}`, () => {
      return this.prismaService.city.findMany({
        where: {
          state_id,
        },
      });
    });
  }

  async create(data: CreateCityDto): Promise<City> {
    return this.prismaService.city.create({
      data,
    });
  }
}
