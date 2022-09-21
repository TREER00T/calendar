import {Body, Controller, Post, Get} from '@nestjs/common';
import {ProviderService} from './provider.service';
import {AuthDto} from './dto';

@Controller()
export class ProviderController {
    constructor(private providerService: ProviderService) {
    }

    @Post()
    addProvider(@Body() dto: AuthDto) {
        return this.providerService.addProvider(dto);
    }

    @Get()
    getAllProviders() {
        return this.providerService.getAllProviders();
    }
}
