import {Body, Controller, Post, Get, Delete, Param} from '@nestjs/common';
import {WorkTimeService} from './workTime.service';
import {WorkTimeDto} from './dto';

@Controller()
export class WorkTimeController {
    constructor(private workTimeService: WorkTimeService) {
    }

    @Post()
    add(@Body() dto: WorkTimeDto) {
        return this.workTimeService.add(dto);
    }

    @Get('/:id')
    getAll(@Param() id: number) {
        return this.workTimeService.getAll(id);
    }

    @Delete('/:id')
    delete(@Param() id: number) {
        return this.workTimeService.delete(id);
    }
}