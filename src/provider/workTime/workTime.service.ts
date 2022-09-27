import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {WorkTimeDto} from './dto';
import HttpStatus from '../../util/HttpStatus';
import {FilterWorkTimeDto} from './dto/filterWorkTime.dto';
import {ID} from '../../type';
import ms from "ms";

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


        let isExist = await this.prisma.providersWorkTimeInDay.findFirst({
            where: {
                org_id: 1,
                provider_id: dto.provider_id,
                service_id: dto.service_id,
                date: dto.date,
                day: dto.day
            }
        });

        if (!isExist)
            return Res.json(HttpStatus.HTTP_FORBIDDEN);


        let service = await this.prisma.service.findUnique({
            where: {
                id: dto.service_id
            }
        });

        let amountService = ms(60 < service.amount_time ? `${service.amount_time}m` : service.amount_time / 60 + ' hrs');

        const orgWorkTime = await this.prisma.orgsWorkTimes.findFirst({
            where: {
                day_id: dto.day_id,
                org_id: 1
            },
        });

        if (!orgWorkTime)
            return Res.json(HttpStatus.HTTP_FORBIDDEN);

        if (dto.start_time >= orgWorkTime[0].start_time && amountService + orgWorkTime[0].start_time <= orgWorkTime[0].end_time) {

            await this.prisma.providersWorkTimes.create({
                data: {
                    start_time: dto.start_time,
                    end_time: dto.end_time,
                    day_id: parseInt(String(dto.day_id)),
                    org_id: 1,
                    service_id: parseInt(String(dto.service_id)),
                    provider_id: parseInt(String(dto.provider_id))
                }
            });

            return Res.json(HttpStatus.HTTP_OK);
        }

        return Res.json(HttpStatus.HTTP_FORBIDDEN);
    }

    async getAll(dto: FilterWorkTimeDto) {
        let providerWorkTimes = await this.prisma.providersWorkTimes.findMany({
            where: {
                day_id: parseInt(String(dto.day_id)),
                service_id: parseInt(String(dto.service_id)),
                provider_id: parseInt(String(dto.provider_id))
            }
        });

        return Res.json(HttpStatus.HTTP_OK, providerWorkTimes);
    }

    async edit(param: ID, dto: WorkTimeDto) {
        const providersWorkTimes = await this.prisma.providersWorkTimes.findFirst({
            where: {
                id: parseInt(String(param.id))
            },
        });

        if (!providersWorkTimes)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.providersWorkTimes.update({
            where: {
                id: parseInt(String(param.id))
            },
            data: {
                start_time: dto.start_time,
                end_time: dto.end_time,
                day_id: parseInt(String(dto.day_id)),
                org_id: 1,
                service_id: parseInt(String(dto.service_id)),
                provider_id: parseInt(String(dto.provider_id))
            }
        });


        return Res.json(HttpStatus.HTTP_OK);
    }


    async delete(param: ID) {
        const providersWorkTimes = await this.prisma.providersWorkTimes.findFirst({
            where: {
                id: parseInt(String(param.id))
            },
        });

        if (!providersWorkTimes)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.providersWorkTimes.delete({
            where: {
                id: parseInt(String(param.id))
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}