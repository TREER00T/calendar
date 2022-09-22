import {HttpException} from '@nestjs/common';

type Response = {
    message: string,
    statusCode: number,
    data?: any[]
}

export class Res {

    static json(res: Response, data?: any) {
        if (res.statusCode !== 200)
            throw new HttpException(res.message, res.statusCode);


        if (data !== undefined)
            return Object.assign(res,{
                data: data
            });

        return res;
    }

}
