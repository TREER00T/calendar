import {Module} from '@nestjs/common';
import {ServiceController} from './service.controller';
import {Service} from './service.service';

@Module({
    imports: [],
    controllers: [ServiceController],
    providers: [Service],
})
export class ServiceModule {
}