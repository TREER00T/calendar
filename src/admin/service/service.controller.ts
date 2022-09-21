import {Body, Controller, Post, Get, Put, Delete, Param} from '@nestjs/common';
import {Service} from './service.service';
import {ServiceDto} from './dto';

@Controller()
export class ServiceController {
    constructor(private service: Service) {
    }

    @Post()
    addService(@Body() dto: ServiceDto) {
        return this.service.addService(dto);
    }

    @Get()
    getAllServices() {
        return this.service.getAllServices();
    }

    @Put('/:id')
    editService(@Param() id: number, @Body() dto: ServiceDto) {
        return this.service.editService(id, dto);
    }

    @Delete('/:id')
    deleteService(@Param() id: number) {
        return this.service.deleteService(id);
    }
}
