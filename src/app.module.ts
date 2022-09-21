import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from './prisma/prisma.module';
import {RouterModule} from '@nestjs/core';
import {AdminModule} from './admin/admin.module';
import {AuthModule} from './admin/auth/auth.module';
import {ProviderModule} from './admin/provider/provider.module';
import {ServiceModule} from './admin/service/service.module';

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
                    {path: 'services', module: ServiceModule}
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
