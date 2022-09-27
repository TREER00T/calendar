import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class WorkTimeDto {
    @IsString()
    @IsNotEmpty()
    start_time: number;

    @IsString()
    @IsNotEmpty()
    end_time: number;

    @IsNumber()
    @IsNotEmpty()
    day_id: number;
}
