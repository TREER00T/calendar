import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {WorkTimeDto} from './dto';
import HttpStatus from '../../util/HttpStatus';
import {ID} from '../../type';

@Injectable()
export class WorkTimeService {
    constructor(private prisma: PrismaService) {
    }

    async add(dto: WorkTimeDto) {
        const workTimeInDay = await this.prisma.orgsWorkTimeInDay.findFirst({
            where: {
                id: parseInt(String(dto.day_id))
            },
        });

        if (!workTimeInDay)
            await this.prisma.orgsWorkTimes.create({
                data: {
                    start_time: dto.start_time,
                    end_time: dto.end_time,
                    day_id: parseInt(String(dto.day_id)),
                    org_id: 1
                }
            });


        return Res.json(HttpStatus.HTTP_CONFLICT);
    }

    async getAll(param: ID) {
        let orgWorkTimes = await this.prisma.orgsWorkTimes.findMany({
            where: {
                day_id: parseInt(String(param.id))
            }
        });

        return Res.json(HttpStatus.HTTP_OK, orgWorkTimes);
    }

    async delete(param: ID) {
        const orgWorkTime = await this.prisma.orgsWorkTimes.findUnique({
            where: {
                id: parseInt(String(param.id))
            },
        });

        if (!orgWorkTime)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.orgsWorkTimes.delete({
            where: {
                id: parseInt(String(param.id))
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}