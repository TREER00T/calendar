import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {WorkTimeDto} from './dto';
import HttpStatus from '../../util/HttpStatus';
import {FilterWorkTimeDto} from './dto/filterWorkTime.dto';

@Injectable()
export class WorkTimeService {
    constructor(private prisma: PrismaService) {
    }

    async add(dto: WorkTimeDto) {
        const orgWorkTimeInWeek = await this.prisma.orgsWorkTimeInDay.findFirst({
            where: {
                date: dto.date,
                day: dto.day,
                org_id: 1
            },
        });

        if (!orgWorkTimeInWeek)
            return Res.json(HttpStatus.HTTP_FORBIDDEN);

        const orgWorkTimeInDay = await this.prisma.orgsWorkTimes.findFirst({
            where: {
                start_time: {
                    gt: dto.start_time
                },
                end_time: {
                    lt: dto.end_time
                },
                org_id: 1
            },
        });

        if (!orgWorkTimeInDay)
            return Res.json(HttpStatus.HTTP_FORBIDDEN);

        await this.prisma.providersWorkTimes.create({
            data: {
                start_time: dto.start_time,
                end_time: dto.end_time,
                day_id: dto.day_id,
                org_id: 1,
                service_id: dto.service_id,
                provider_id: dto.provider_id
            }
        });


        return Res.json(HttpStatus.HTTP_OK);
    }

    async getAll(dto: FilterWorkTimeDto) {
        let providerWorkTimes = await this.prisma.providersWorkTimes.findMany({
            where: {
                day_id: dto.day_id,
                service_id: dto.service_id,
                provider_id: dto.provider_id,
            }
        });

        return Res.json(HttpStatus.HTTP_OK, providerWorkTimes);
    }

    async edit(id: number, dto: WorkTimeDto) {
        const providersWorkTimes = await this.prisma.providersWorkTimes.findFirst({
            where: {
                id: id
            },
        });

        if (!providersWorkTimes)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.providersWorkTimes.update({
            where: {
                id: id
            },
            data: {
                start_time: dto.start_time,
                end_time: dto.end_time,
                day_id: dto.day_id,
                org_id: 1,
                service_id: dto.service_id,
                provider_id: dto.provider_id
            }
        });


        return Res.json(HttpStatus.HTTP_OK);
    }


    async delete(id: number) {
        const providersWorkTimes = await this.prisma.providersWorkTimes.findFirst({
            where: {
                id: id
            },
        });

        if (!providersWorkTimes)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.providersWorkTimes.delete({
            where: {
                id: id
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}