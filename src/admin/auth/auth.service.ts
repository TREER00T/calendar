import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';
import {Res} from '../../util/Response';
import {AuthDto} from './dto';
import HttpStatus from '../../util/HttpStatus';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {
    }

    async signin(dto: AuthDto) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                username: dto.username,
            },
        });

        if (!admin)
            return Res.json(HttpStatus.HTTP_NOT_FOUND);

        let isValidaPassword = dto.password === admin.password;

        if (!isValidaPassword)
            return Res.json(HttpStatus.HTTP_PRECONDITION_FAILED);


        return Res.json(HttpStatus.HTTP_OK);
    }

}
