import { ReturnUserDto } from 'src/user/dtos/return-user-dto';

export interface ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
