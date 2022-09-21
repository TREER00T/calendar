import {Module} from '@nestjs/common';
import {WorkTimeInDayController} from './workTimeInDay.controller';
import {WorkTimeInDayService} from './workTimeInDay.service';

@Module({
    imports: [],
    controllers: [WorkTimeInDayController],
    providers: [WorkTimeInDayService],
})
export class ProviderWorkTimeInDayModule {
}