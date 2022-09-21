import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {ServiceDto} from './dto';
import HttpStatus from '../../util/HttpStatus';

@Injectable()
export class Service {
    constructor(private prisma: PrismaService) {
    }

    async addService(dto: ServiceDto) {
        const service = await this.prisma.service.findFirst({
            where: {
                name: dto.name
            },
        });

        if (!service)
            await this.prisma.service.create({
                data: {
                    name: dto.name,
                    amount_time: dto.amount_time
                }
            });


        return Res.json(HttpStatus.HTTP_CONFLICT);
    }

    async getAllServices() {
        let services = await this.prisma.service.findMany();

        return Res.json(HttpStatus.HTTP_OK, services);
    }

    async editService(id: number, dto: ServiceDto) {
        const service = await this.prisma.service.findUnique({
            where: {
                id: id
            },
        });

        if (!service)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.service.update({
            where: {
                id: id
            },
            data: {
                name: dto.name,
                amount_time: dto.amount_time
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

    async deleteService(id: number) {
        const service = await this.prisma.service.findUnique({
            where: {
                id: id
            },
        });

        if (!service)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        await this.prisma.service.delete({
            where: {
                id: id
            }
        });

        return Res.json(HttpStatus.HTTP_OK);
    }

}