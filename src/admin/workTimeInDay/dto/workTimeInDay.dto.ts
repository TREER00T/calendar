import {IsNotEmpty, IsString} from 'class-validator';

export class WorkTimeInDayDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  day: string;
}
