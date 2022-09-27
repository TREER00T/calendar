import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {WorkTimeInDayDto} from './dto';
import HttpStatus from '../../util/HttpStatus';
import {ID, ServiceID} from '../../type';
import ms from 'ms';

@Injectable()
export class WorkTimeInDayService {
    constructor(private prisma: PrismaService) {
    }

    async add(dto: WorkTimeInDayDto) {
        const orgWorkTimeInDay = await this.prisma.orgsWorkTimeInDay.findFirst({
            where: {
                date: dto.date,
                day: dto.day,
                org_id: 1
            },
        });

        if (!orgWorkTimeInDay)
            return Res.json(HttpStatus.HTTP_FORBIDDEN);

        await this.prisma.providersWorkTimeInDay.create({
            data: {
                date: dto.date,
                day: dto.day,
                provider_id: parseInt(String(dto.provider_id)),
                org_id: 1,
                service_id: parseInt(String(dto.service_id))
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

    async getAll(param: ID, query: ServiceID) {
        let providerWorkTimeInWeek = await this.prisma.providersWorkTimeInDay.findMany({
            where: {
                provider_id: parseInt(String(param.id)),
                org_id: 1,
                service_id: parseInt(String(query.service_id))
            }
        });

        console.log(providerWorkTimeInWeek)
        return Res.json(HttpStatus.HTTP_OK, providerWorkTimeInWeek);
    }

    async edit(param: ID, dto: WorkTimeInDayDto) {

        const providerWorkTimeInDay = await this.prisma.providersWorkTimeInDay.findUnique({
            where: {
                id: parseInt(String(param.id))
            },
        });

        if (!providerWorkTimeInDay)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.providersWorkTimeInDay.update({
            where: {
                id: parseInt(String(param.id))
            },
            data: {
                date: dto.date,
                day: dto.day,
                provider_id: parseInt(String(dto.provider_id)),
                org_id: 1,
                service_id: parseInt(String(dto.service_id))
            }
        });


        return Res.json(HttpStatus.HTTP_OK);
    }

    async delete(param: ID) {
        const providerWorkTimeInDay = await this.prisma.providersWorkTimeInDay.findUnique({
            where: {
                id: parseInt(String(param.id))
            },
        });

        if (!providerWorkTimeInDay)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.providersWorkTimeInDay.delete({
            where: {
                id: parseInt(String(param.id))
            }
        }).then(() => {
            this.prisma.providersWorkTimes.deleteMany({
                where: {
                    day_id: parseInt(String(param.id))
                }
            });
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}