import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PrismaClient} from '@prisma/client';
import {Day} from '../util/Day';
import ms from 'ms';


@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                calendar: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
        this.init();
    }

    async insertDataInUserTable() {
        let userData = [
            {
                username: 'hasan123',
                password: 'hasan123'
            },
            {
                username: 'aliazmoodeh',
                password: 'aliazmoodeh'
            }
        ];


        let result = await this.user.findUnique({
            where: {
                username: 'hasan123'
            }
        });

        if (result === null)
            for (let object of userData) {
                await this.user.create({
                    data: object
                });
            }

    }

    async insertDataInAdminTable() {
        let adminData = [
            {
                username: 'admin123',
                password: 'admin123'
            },
            {
                username: 'adminadmin',
                password: 'adminadmin'
            }
        ];


        let result = await this.admin.findUnique({
            where: {
                username: 'admin123'
            }
        });

        if (result === null)
            for (let object of adminData) {
                let admin = await this.admin.create({
                    data: object
                });
                await this.orgsAdmins.create({
                    data: {
                        org_id: 1,
                        admin_id: admin.id
                    }
                });
            }

    }

    async insertDataInOrgTable() {
        let orgData = [
            {
                name: 'treegex'
            }
        ];


        let result = await this.org.findUnique({
            where: {
                id: 1
            }
        });


        if (result === null)
            for (let object of orgData) {
                await this.org.create({
                    data: object
                });
            }

    }

    async insertDataInServiceTable() {
        let serviceData = [
            {
                name: 'کاشت ناخن',
                amount_time: 90
            },
            {
                name: 'نظافت ساختمان',
                amount_time: 120
            },
            {
                name: 'مراقبت از نوزاد',
                amount_time: 45
            }
        ];


        let result = await this.service.findUnique({
            where: {
                id: 1
            }
        });


        if (result === null)
            for (let object of serviceData) {
                await this.service.create({
                    data: object
                });
            }

    }


    async insertDataInProviderTable() {
        let providerData = [
            {
                username: 'provider123',
                password: 'provider123'
            },
            {
                username: 'provider78',
                password: 'provider78'
            }
        ];


        let result = await this.provider.findUnique({
            where: {
                id: 1
            }
        });


        if (result === null)
            for (let object of providerData) {
                let provider = await this.provider.create({
                    data: object
                });
                await this.orgsProviders.create({
                    data: {
                        org_id: 1,
                        provider_id: provider.id
                    }
                });
            }

    }

    async insertDataInOrgWorkTimeTable() {
        let orgWorkTimeInDayData = [
            {
                org_id: 1,
                date: '2022-09-27',
                day: Day.Tuesday
            },
            {
                org_id: 1,
                date: '2022-09-28',
                day: Day.Wednesday
            }
        ];


        let result = await this.orgsWorkTimeInDay.findUnique({
            where: {
                id: 1
            }
        });


        if (result === null) {
            for (let object of orgWorkTimeInDayData) {
                await this.orgsWorkTimeInDay.create({
                    data: object
                });
            }

            await this.orgsWorkTimes.createMany({
                data: [
                    {
                        start_time: 1664278200000,
                        end_time: 1664289000000,
                        org_id: 1,
                        day_id: 1
                    },
                    {
                        start_time: 1664305200000,
                        end_time: 1664321400000,
                        org_id: 1,
                        day_id: 1
                    },
                    {
                        start_time: 1664364600000,
                        end_time: 1664375400000,
                        org_id: 1,
                        day_id: 2
                    },
                    {
                        start_time: 1664391600000,
                        end_time: 1664407800000,
                        org_id: 1,
                        day_id: 2
                    }
                ]
            });
        }

    }

    async insertDataInProviderWorkTimeTable() {

        let orgWorkTimeInDay = await this.orgsWorkTimeInDay.findFirst({
            where: {
                org_id: 1,
                date: '2022-09-27',
                day: 'Tuesday'
            }
        });

        if (!orgWorkTimeInDay)
            return;

        let isExist = await this.providersWorkTimeInDay.findFirst({
            where: {
                org_id: 1,
                provider_id: 2,
                service_id: 2,
                date: '2022-09-27',
                day: 'Tuesday'
            }
        });

        if (isExist === null) {
            let providerWorkTimeInDay = await this.providersWorkTimeInDay.create({
                data: {
                    org_id: 1,
                    provider_id: 2,
                    service_id: 2,
                    date: '2022-09-27',
                    day: 'Tuesday'
                }
            });

            let orgWorkTimes = await this.orgsWorkTimes.findMany({
                where: {
                    org_id: 1,
                    day_id: 1
                }
            });

            let service = await this.service.findUnique({
                where: {
                    id: 2
                }
            });

            let amountService = ms(60 < service.amount_time ? `${service.amount_time}m` : service.amount_time / 60 + ' hrs');

            let findObject = [];
            const TIME_START_WORK = 1664278200000;

            orgWorkTimes.forEach(object => {
                let startTime = object.start_time,
                    endTime = object.end_time;

                if (TIME_START_WORK >= startTime && amountService + TIME_START_WORK <= endTime) {
                    findObject.push(object);
                    return;
                }
            });

            await this.providersWorkTimes.create({
                data: {
                    start_time: findObject[0].start_time,
                    end_time: amountService + TIME_START_WORK,
                    day_id: providerWorkTimeInDay.id,
                    org_id: 1,
                    service_id: service.id,
                    provider_id: 2
                }
            });


        }


    }


    init() {
        this.insertDataInUserTable().then(async () => {
            await this.insertDataInOrgTable();
            await this.insertDataInAdminTable();
            await this.insertDataInServiceTable();
            await this.insertDataInOrgWorkTimeTable();
            await this.insertDataInProviderTable();
            await this.insertDataInProviderWorkTimeTable();
        }).then(async () => {
            await this.$disconnect();
        });
    }
}