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
        const workTimeInDay = await this.prisma.orgsWorkTimeInDay.findFirst({
            where: {
                date: dto.date
            },
        });

        if (!workTimeInDay)
            await this.prisma.orgsWorkTimeInDay.create({
                data: {
                    date: dto.date,
                    day: dto.day,
                    org_id: 1
                }
            });


        return Res.json(HttpStatus.HTTP_CONFLICT);
    }

    async getAll() {
        let orgWorkTimeInDay = await this.prisma.orgsWorkTimeInDay.findMany();

        return Res.json(HttpStatus.HTTP_OK, orgWorkTimeInDay);
    }

    async delete(id: number) {
        const orgWorkTimeInDay = await this.prisma.orgsWorkTimeInDay.findUnique({
            where: {
                id: id
            },
        });

        if (!orgWorkTimeInDay)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.orgsWorkTimeInDay.delete({
            where: {
                id: id
            }
        }).then(() => {
            this.prisma.orgsWorkTimes.deleteMany({
                where: {
                    day_id: id
                }
            });
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}