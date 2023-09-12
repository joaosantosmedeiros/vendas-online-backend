import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dtos/create-city-dto';
import { Roles } from 'src/decorators/roles-decorator';
import { UserType } from 'src/user/enum/userType-enum';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':stateId')
  async getAllCitiesByStateId(@Param('stateId') stateId: number) {
    return this.cityService.getAllCitiesByStateId(Number(stateId));
  }

  @Post()
  @Roles(UserType.Admin)
  async create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }
}
