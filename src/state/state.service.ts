import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { State } from './entities/state-entity';
import { CreateStateDto } from './dtos/create-state-dto';

@Injectable()
export class StateService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllStates(): Promise<State[]> {
    return this.prismaService.state.findMany({});
  }

  async create(data: CreateStateDto): Promise<State> {
    return this.prismaService.state.create({
      data,
    });
  }
}
