import {Body, Controller, Post, Get, Delete, Param, Put, Query} from '@nestjs/common';
import {WorkTimeService} from './workTime.service';
import {WorkTimeDto} from './dto';
import {FilterWorkTimeDto} from './dto/filterWorkTime.dto';
import {ID} from '../../type';

@Controller()
export class WorkTimeController {
    constructor(private workTimeService: WorkTimeService) {
    }

    @Post()
    add(@Body() dto: WorkTimeDto) {
        return this.workTimeService.add(dto);
    }

    @Get()
    getAll(@Query() dto: FilterWorkTimeDto) {
        return this.workTimeService.getAll(dto);
    }

    @Put('/:id')
    edit(@Param() id: ID, @Body() dto: WorkTimeDto) {
        return this.workTimeService.edit(id, dto);
    }

    @Delete('/:id')
    delete(@Param() id: ID) {
        return this.workTimeService.delete(id);
    }
}
