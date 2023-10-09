import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ReturnCepDto } from './dtos/return-cep-dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get('price-delivery')
  async findDeliveryPrice(): Promise<any> {
    return this.correiosService.findDeliveryPrice();
  }

  @Get(':cep')
  async findAll(@Param('cep') cep: string): Promise<ReturnCepDto> {
    return this.correiosService.findAddressByCep(cep);
  }
}
