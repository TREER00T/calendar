import {Body, Controller, Post, Get, Put, Delete, Param} from '@nestjs/common';
import {Service} from './service.service';
import {ServiceDto} from './dto';
import {ID} from '../../type';

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
    edit(@Param() id: ID, @Body() dto: ServiceDto) {
        return this.service.edit(id, dto);
    }

    @Delete('/:id')
    delete(@Param() id: ID) {
        return this.service.delete(id);
    }
}
