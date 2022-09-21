import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {AuthDto} from './dto';
import HttpStatus from '../../util/HttpStatus';

@Injectable()
export class ProviderService {
    constructor(private prisma: PrismaService) {
    }

    async add(dto: AuthDto) {
        const provider = await this.prisma.provider.findFirst({
            where: {
                username: dto.username
            },
        });

        if (!provider) {
            let newProvider = await this.prisma.provider.create({
                data: {
                    username: dto.username,
                    password: dto.password
                }
            });
            await this.prisma.orgsProviders.create({
                data: {
                    provider_id: newProvider.id,
                    org_id: 1
                }
            });
        }

        return Res.json(HttpStatus.HTTP_CONFLICT);
    }

    async getAll() {
        let providers = await this.prisma.orgsProviders.findMany({
            where: {
                org_id: 1
            },
            select: {
                provider: {
                    select: {
                        username: true,
                        id: true
                    }
                }
            }
        });

        let listOfProvider = [];

        providers.forEach(object => {
            listOfProvider.push(object.provider);
        });


        return Res.json(HttpStatus.HTTP_OK, listOfProvider);
    }

}