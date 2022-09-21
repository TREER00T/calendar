import {Module} from '@nestjs/common';
import {ProviderAuthModule} from './auth/auth.module';
import {ProviderWorkTimeModule} from './workTime/workTime.module';
import {ProviderWorkTimeInDayModule} from './workTimeInDay/workTimeInDay.module';

@Module({
    imports: [
        ProviderAuthModule,
        ProviderWorkTimeModule,
        ProviderWorkTimeInDayModule
    ],
})
export class ProviderModule {
}
