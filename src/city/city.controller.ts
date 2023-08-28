import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dtos/create-city-dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':stateId')
  async getAllCitiesByStateId(@Param('stateId') stateId: number) {
    return this.cityService.getAllCitiesByStateId(Number(stateId));
  }

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }
}
