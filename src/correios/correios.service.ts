import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { ReturnCepExternalDto } from './dtos/return-cep-external-dto';
import { CityService } from 'src/city/city.service';

@Injectable()
export class CorreiosService {
  readonly URL_CORREIOS = process.env.URL_CEP_CORREIOS;
  constructor(
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAddressByCep(cep: string): Promise<ReturnCepExternalDto> {
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

    const city = await this.cityService.getCityByName(
      returnCep.localidade,
      returnCep.uf,
    );

    console.log(city);

    return returnCep;
  }
}
