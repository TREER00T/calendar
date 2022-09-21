import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from './prisma/prisma.module';
import {RouterModule} from '@nestjs/core';
import {AdminModule} from './admin/admin.module';
import {AdminAuthModule} from './admin/auth/auth.module';
import {ProviderAuthModule} from './provider/auth/auth.module';
import {AdminProviderModule} from './admin/provider/provider.module';
import {ProviderModule} from './provider/provider.module';
import {ServiceModule} from './admin/service/service.module';
import {AdminWorkTimeModule} from './admin/workTime/workTime.module';
import {ProviderWorkTimeModule} from './provider/workTime/workTime.module';
import {AdminWorkTimeInDayModule} from './admin/workTimeInDay/workTimeInDay.module';
import {ProviderWorkTimeInDayModule} from './provider/workTimeInDay/workTimeInDay.module';

@Module({
    imports: [
        AdminModule,
        ProviderModule,
        RouterModule.register([
            {
                path: 'admin',
                module: AdminModule,
                children: [
                    {path: 'auth', module: AdminAuthModule},
                    {path: 'providers', module: AdminProviderModule},
                    {path: 'services', module: ServiceModule},
                    {path: 'workTimes', module: AdminWorkTimeModule},
                    {path: 'workTimeInDays', module: AdminWorkTimeInDayModule},
                ],
            },
            {
                path: 'provider',
                module: ProviderModule,
                children: [
                    {path: 'auth', module: ProviderAuthModule},
                    {path: 'workTimes', module: ProviderWorkTimeModule},
                    {path: 'workTimeInDays', module: ProviderWorkTimeInDayModule},
                ],
            },
        ]),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
})
export class AppModule {
}
