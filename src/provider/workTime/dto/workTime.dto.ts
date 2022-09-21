import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class WorkTimeDto {
    @IsString()
    @IsNotEmpty()
    start_time: string;

    @IsString()
    @IsNotEmpty()
    end_time: string;

    @IsNumber()
    @IsNotEmpty()
    day_id: number;

    @IsNumber()
    @IsNotEmpty()
    service_id: number;
}
