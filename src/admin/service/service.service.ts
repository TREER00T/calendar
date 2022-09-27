import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {ServiceDto} from './dto';
import HttpStatus from '../../util/HttpStatus';
import {ID} from '../../type';


@Injectable()
export class Service {
    constructor(private prisma: PrismaService) {
    }

    async add(dto: ServiceDto) {
        const service = await this.prisma.service.findFirst({
            where: {
                name: dto.name
            },
        });

        if (!service)
            await this.prisma.service.create({
                data: {
                    name: dto.name,
                    amount_time: parseInt(String(dto.amount_time))
                }
            });


        return Res.json(HttpStatus.HTTP_CONFLICT);
    }

    async getAll() {
        let services = await this.prisma.service.findMany();

        return Res.json(HttpStatus.HTTP_OK, services);
    }

    async edit(param: ID, dto: ServiceDto) {
        const service = await this.prisma.service.findUnique({
            where: {
                id: parseInt(String(param.id))
            },
        });

        if (!service)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.service.update({
            where: {
                id: parseInt(String(param.id))
            },
            data: {
                name: dto.name,
                amount_time: parseInt(String(dto.amount_time))
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

    async delete(param: ID) {
        const service = await this.prisma.service.findUnique({
            where: {
                id: parseInt(String(param.id))
            },
        });

        if (!service)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.service.delete({
            where: {
                id: parseInt(String(param.id))
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}