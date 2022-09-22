import {IsNotEmpty, IsNumber} from 'class-validator';

export class FilterWorkTimeDto {
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
