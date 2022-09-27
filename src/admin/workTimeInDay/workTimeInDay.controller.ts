import {Body, Controller, Post, Get, Delete, Param} from '@nestjs/common';
import {WorkTimeInDayService} from './workTimeInDay.service';
import {WorkTimeInDayDto} from './dto';
import {ID} from '../../type';

@Controller()
export class WorkTimeInDayController {
    constructor(private workTimeInDayService: WorkTimeInDayService) {
    }

    @Post()
    add(@Body() dto: WorkTimeInDayDto) {
        return this.workTimeInDayService.add(dto);
    }

    @Get()
    getAll() {
        return this.workTimeInDayService.getAll();
    }

    @Delete('/:id')
    delete(@Param() id: ID) {
        return this.workTimeInDayService.delete(id);
    }
}
