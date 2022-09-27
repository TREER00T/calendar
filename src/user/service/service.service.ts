import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {ServiceDto} from './dto';
import HttpStatus from '../../util/HttpStatus';
import {ID, OrderId, WorkTimeId} from '../../type';

@Injectable()
export class Service {
    constructor(private prisma: PrismaService) {
    }

    async add(dto: ServiceDto) {
        let service = await this.prisma.providersWorkTimeInDay.findFirst({
            where: {
                service_id: parseInt(String(dto.service_id)),
                provider_id: parseInt(String(dto.provider_id)),
                date: dto.date
            },
        });

        if (!service)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);


        let userOrders = await this.prisma.usersOrders.create({
            data: {
                user_id: parseInt(String(dto.user_id)),
                service_id: parseInt(String(dto.service_id)),
                org_id: 1,
                provider_id: parseInt(String(dto.provider_id))
            }
        });


        return Res.json(HttpStatus.HTTP_OK, {
            orderId: userOrders.id
        });
    }

    async addWorkTime(firstBody: WorkTimeId, secondBody: OrderId) {

        await this.prisma.usersOrders.update({
            where: {
                id: parseInt(String(secondBody.orderId))
            },
            data: {
                provider_workTime_id: parseInt(String(firstBody.workTimeId))
            }
        });


        return Res.json(HttpStatus.HTTP_OK);
    }

    async getAll(param: ID) {
        let userOrders = await this.prisma.usersOrders.findMany({
            where: {
                user_id: parseInt(String(param.id))
            }
        });

        return Res.json(HttpStatus.HTTP_OK, userOrders);
    }

    async delete(param: ID) {

        await this.prisma.usersOrders.delete({
            where: {
                id: parseInt(String(param.id))
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}