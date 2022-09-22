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

    @Put()
    addWorkTime(@Body() workTimeId: number, @Body() orderId: number) {
        return this.service.addWorkTime(workTimeId, orderId);
    }

    @Get('/:id')
    getAll(@Param() id: number) {
        return this.service.getAll(id);
    }

    @Delete('/:id')
    delete(@Param() id: number) {
        return this.service.delete(id);
    }
}
