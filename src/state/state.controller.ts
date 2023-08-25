import { Body, Controller, Get, Post } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './entities/state-entity';
import { CreateStateDto } from './dtos/create-state-dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllStates(): Promise<State[]> {
    return this.stateService.getAllStates();
  }

  @Post()
  async createState(@Body() createStateDto: CreateStateDto): Promise<State> {
    return this.stateService.create(createStateDto);
  }
}
