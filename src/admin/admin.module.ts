import {Module} from '@nestjs/common';
import {AdminAuthModule} from './auth/auth.module';
import {AdminProviderModule} from './provider/provider.module';
import {AdminServiceModule} from './service/service.module';
import {AdminWorkTimeModule} from './workTime/workTime.module';
import {AdminWorkTimeInDayModule} from './workTimeInDay/workTimeInDay.module';

@Module({
    imports: [
        AdminAuthModule,
        AdminProviderModule,
        AdminServiceModule,
        AdminWorkTimeModule,
        AdminWorkTimeInDayModule
    ],
})
export class AdminModule {
}
