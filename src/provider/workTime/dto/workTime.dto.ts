import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class WorkTimeDto {
    @IsString()
    @IsNotEmpty()
    start_time: number;

    @IsString()
    @IsNotEmpty()
    end_time: number;

    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    day: string;

    @IsNumber()
    @IsNotEmpty()
    day_id: number;

    @IsNumber()
    @IsNotEmpty()
    service_id: number;

    @IsNumber()
    @IsNotEmpty()
    provider_id: number;
}
