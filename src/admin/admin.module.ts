import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {ProviderModule} from './provider/provider.module';
import {ServiceModule} from './service/service.module';

@Module({
    imports: [
        AuthModule,
        ProviderModule,
        ServiceModule
    ],
})
export class AdminModule {
}
