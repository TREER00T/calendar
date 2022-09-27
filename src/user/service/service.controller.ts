import {Body, Controller, Post, Get, Put, Delete, Param} from '@nestjs/common';
import {Service} from './service.service';
import {ServiceDto} from './dto';
import {ID, OrderId,WorkTimeId} from '../../type';

@Controller()
export class ServiceController {
    constructor(private service: Service) {
    }

    @Post()
    add(@Body() dto: ServiceDto) {
        return this.service.add(dto);
    }

    @Put()
    addWorkTime(@Body() workTimeId: WorkTimeId, @Body() orderId: OrderId) {
        return this.service.addWorkTime(workTimeId, orderId);
    }

    @Get('/:id')
    getAll(@Param() userId: ID) {
        return this.service.getAll(userId);
    }

    @Delete('/:id')
    delete(@Param() userId: ID) {
        return this.service.delete(userId);
    }
}
