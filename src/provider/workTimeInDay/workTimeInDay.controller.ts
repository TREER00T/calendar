import {Body, Controller, Post, Get, Delete, Param, Put, Query} from '@nestjs/common';
import {WorkTimeInDayService} from './workTimeInDay.service';
import {WorkTimeInDayDto} from './dto';

@Controller()
export class WorkTimeInDayController {
    constructor(private workTimeInDayService: WorkTimeInDayService) {
    }

    @Post()
    add(@Body() dto: WorkTimeInDayDto) {
        return this.workTimeInDayService.add(dto);
    }

    @Get()
    getAll(@Param() id: number, @Query() service: number) {
        return this.workTimeInDayService.getAll(id, service);
    }

    @Put('/:id')
    edit(@Param() id: number, @Body() dto: WorkTimeInDayDto) {
        return this.workTimeInDayService.edit(id, dto);
    }

    @Delete('/:id')
    delete(@Param() id: number) {
        return this.workTimeInDayService.delete(id);
    }
}
