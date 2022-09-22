import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class ServiceDto {
    @IsString()
    @IsNotEmpty()
    date: string;

    @IsNumber()
    @IsNotEmpty()
    service_id: number;

    @IsNumber()
    @IsNotEmpty()
    provider_id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}
