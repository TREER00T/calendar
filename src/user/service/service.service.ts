import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {ServiceDto} from './dto';
import HttpStatus from '../../util/HttpStatus';

@Injectable()
export class Service {
    constructor(private prisma: PrismaService) {
    }

    async add(dto: ServiceDto) {
        let service = await this.prisma.providersWorkTimeInDay.findFirst({
            where: {
                service_id: dto.service_id,
                provider_id: dto.provider_id,
                date: dto.date
            },
        });

        if (!service)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);


        let userOrders = await this.prisma.usersOrders.create({
            data: {
                user_id: dto.user_id,
                service_id: dto.service_id,
                org_id: 1,
                provider_id: dto.provider_id,
            }
        });


        return Res.json(HttpStatus.HTTP_OK, {
            orderId: userOrders.id
        });
    }

    async addWorkTime(workTimeId: number, orderId: number) {

        await this.prisma.usersOrders.update({
            where: {
                id: orderId
            },
            data: {
                provider_workTime_id: workTimeId
            }
        });


        return Res.json(HttpStatus.HTTP_OK);
    }

    async getAll(userId: number) {
        let userOrders = await this.prisma.usersOrders.findMany({
            where: {
                user_id: userId
            }
        });

        return Res.json(HttpStatus.HTTP_OK, userOrders);
    }

    async delete(id: number) {

        await this.prisma.usersOrders.delete({
            where: {
                id: id
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}