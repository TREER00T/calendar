import {Body, Controller, Post, Get, Put, Delete, Param} from '@nestjs/common';
import {Service} from './service.service';
import {ServiceDto} from './dto';

@Controller()
export class ServiceController {
    constructor(private service: Service) {
    }

    @Post()
    add(@Body() dto: ServiceDto) {
        return this.service.add(dto);
    }

    @Get()
    getAll() {
        return this.service.getAll();
    }

    @Put('/:id')
    edit(@Param() id: number, @Body() dto: ServiceDto) {
        return this.service.edit(id, dto);
    }

    @Delete('/:id')
    delete(@Param() id: number) {
        return this.service.delete(id);
    }
}
