import {Module} from '@nestjs/common';
import {WorkTimeController} from './workTime.controller';
import {WorkTimeService} from './workTime.service';

@Module({
    imports: [],
    controllers: [WorkTimeController],
    providers: [WorkTimeService],
})
export class WorkTimeModule {
}