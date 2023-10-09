import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { ReturnCepExternalDto } from './dtos/return-cep-external-dto';
import { CityService } from 'src/city/city.service';
import { ReturnCepDto } from './dtos/return-cep-dto';
import { City } from 'src/city/entities/city-entity';

@Injectable()
export class CorreiosService {
  readonly URL_CORREIOS = process.env.URL_CEP_CORREIOS;
  constructor(
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAddressByCep(cep: string): Promise<ReturnCepDto> {
    const returnCep: ReturnCepExternalDto = await this.httpService.axiosRef
      .get<ReturnCepExternalDto>(this.URL_CORREIOS.replace('{CEP}', cep))
      .then((result) => {
        if (result.data.erro === 'true') {
          throw new NotFoundException('CEP not found.');
        }
        return result.data;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        throw new BadRequestException(
          'Error in connection request',
          error.message,
        );
      });

    const city: City | undefined = await this.cityService
      .getCityByName(returnCep.localidade, returnCep.uf)
      .catch(() => undefined);

    console.log(city);

    return new ReturnCepDto(returnCep, city?.id, city?.state?.id);
  }
}
