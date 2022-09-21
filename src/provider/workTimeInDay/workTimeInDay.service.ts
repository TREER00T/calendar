import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {WorkTimeInDayDto} from './dto';
import HttpStatus from '../../util/HttpStatus';

@Injectable()
export class WorkTimeInDayService {
    constructor(private prisma: PrismaService) {
    }

    async add(dto: WorkTimeInDayDto) {
        const orgWorkTimeInDay = await this.prisma.orgsWorkTimeInDay.findFirst({
            where: {
                date: dto.date,
                org_id: 1
            },
        });

        if (!orgWorkTimeInDay)
            return Res.json(HttpStatus.HTTP_FORBIDDEN);

        await this.prisma.providersWorkTimeInDay.create({
            data: {
                date: dto.date,
                day: dto.day,
                provider_id: dto.provider_id,
                org_id: 1,
                service_id: dto.service_id
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

    async getAll(providerId: number, serviceId: number) {
        let providerWorkTimeInWeek = await this.prisma.providersWorkTimeInDay.findMany({
            where: {
                provider_id: providerId,
                org_id: 1,
                service_id: serviceId
            }
        });

        return Res.json(HttpStatus.HTTP_OK, providerWorkTimeInWeek);
    }

    async edit(id: number, dto: WorkTimeInDayDto) {

        const providerWorkTimeInDay = await this.prisma.providersWorkTimeInDay.findUnique({
            where: {
                id: id
            },
        });

        if (!providerWorkTimeInDay)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.providersWorkTimeInDay.update({
            where: {
                id: id
            },
            data: {
                date: dto.date,
                day: dto.day,
                provider_id: dto.provider_id,
                org_id: 1,
                service_id: dto.service_id
            }
        });


        return Res.json(HttpStatus.HTTP_OK);
    }

    async delete(id: number) {
        const providerWorkTimeInDay = await this.prisma.providersWorkTimeInDay.findUnique({
            where: {
                id: id
            },
        });

        if (!providerWorkTimeInDay)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.providersWorkTimeInDay.delete({
            where: {
                id: id
            }
        }).then(() => {
            this.prisma.providersWorkTimes.deleteMany({
                where: {
                    day_id: id
                }
            });
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}