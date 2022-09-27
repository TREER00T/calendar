import {Body, Controller, Post, Get, Delete, Param, Put, Query} from '@nestjs/common';
import {WorkTimeInDayService} from './workTimeInDay.service';
import {WorkTimeInDayDto} from './dto';
import {ID, ServiceID} from '../../type';

@Controller()
export class WorkTimeInDayController {
    constructor(private workTimeInDayService: WorkTimeInDayService) {
    }

    @Post()
    add(@Body() dto: WorkTimeInDayDto) {
        return this.workTimeInDayService.add(dto);
    }

    @Get('/:id')
    getAll(@Param() id: ID, @Query() serviceID: ServiceID) {
        return this.workTimeInDayService.getAll(id, serviceID);
    }

    @Put('/:id')
    edit(@Param() id: ID, @Body() dto: WorkTimeInDayDto) {
        return this.workTimeInDayService.edit(id, dto);
    }

    @Delete('/:id')
    delete(@Param() id: ID) {
        return this.workTimeInDayService.delete(id);
    }
}
