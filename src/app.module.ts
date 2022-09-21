import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from './prisma/prisma.module';
import {RouterModule} from '@nestjs/core';
import {AdminModule} from './admin/admin.module';
import {AuthModule} from './admin/auth/auth.module';
import {ProviderModule} from './admin/provider/provider.module';
import {ServiceModule} from './admin/service/service.module';
import {WorkTimeModule} from './admin/workTime/workTime.module';
import {WorkTimeInDayModule} from './admin/workTimeInDay/workTimeInDay.module';

@Module({
    imports: [
        AdminModule,
        RouterModule.register([
            {
                path: 'admin',
                module: AdminModule,
                children: [
                    {path: 'auth', module: AuthModule},
                    {path: 'providers', module: ProviderModule},
                    {path: 'services', module: ServiceModule},
                    {path: 'workTime', module: WorkTimeModule},
                    {path: 'workTimeInDay', module: WorkTimeInDayModule},
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
