import {Module} from '@nestjs/common';
import {UserAuthModule} from './auth/auth.module';
import {UserServiceModule} from "./service/service.module";

@Module({
    imports: [
        UserAuthModule,
        UserServiceModule
    ],
})
export class UserModule {
}
