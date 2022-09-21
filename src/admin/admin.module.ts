import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {ProviderModule} from './provider/provider.module';
import {ServiceModule} from './service/service.module';
import {WorkTimeModule} from './workTime/workTime.module';
import {WorkTimeInDayModule} from './workTimeInDay/workTimeInDay.module';

@Module({
    imports: [
        AuthModule,
        ProviderModule,
        ServiceModule,
        WorkTimeModule,
        WorkTimeInDayModule
    ],
})
export class AdminModule {
}
