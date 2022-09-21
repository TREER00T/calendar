import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class ServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount_time: number;
}
