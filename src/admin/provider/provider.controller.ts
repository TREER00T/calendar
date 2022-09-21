import {Body, Controller, Post, Get} from '@nestjs/common';
import {ProviderService} from './provider.service';
import {AuthDto} from './dto';

@Controller()
export class ProviderController {
    constructor(private providerService: ProviderService) {
    }

    @Post()
    add(@Body() dto: AuthDto) {
        return this.providerService.add(dto);
    }

    @Get()
    getAll() {
        return this.providerService.getAll();
    }
}
