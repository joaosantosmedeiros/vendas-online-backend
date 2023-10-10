import { Body, Controller, Get, Post } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './entities/state-entity';
import { CreateStateDto } from './dtos/create-state-dto';
import { Roles } from 'src/decorators/roles-decorator';
import { UserType } from 'src/user/enum/userType-enum';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllStates(): Promise<State[]> {
    return this.stateService.getAllStates();
  }

  @Post()
  @Roles(UserType.Admin, UserType.Root)
  async createState(@Body() createStateDto: CreateStateDto): Promise<State> {
    return this.stateService.create(createStateDto);
  }
}
