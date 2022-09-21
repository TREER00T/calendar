import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class WorkTimeInDayDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  day: string;

  @IsNumber()
  @IsNotEmpty()
  provider_id: number;

  @IsNumber()
  @IsNotEmpty()
  org_id: number;

  @IsNumber()
  @IsNotEmpty()
  service_id: number;
}
