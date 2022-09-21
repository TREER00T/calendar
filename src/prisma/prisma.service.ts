import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PrismaClient} from '@prisma/client';
import {Day} from '../util/Day';


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
                date: '2022-09-21',
                day: Day.Saturday
            },
            {
                org_id: 1,
                date: '2022-09-23',
                day: Day.Monday
            },
            {
                org_id: 1,
                date: '2022-09-25',
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
                        start_time: '1130',
                        end_time: '1430',
                        org_id: 1,
                        day_id: 1
                    },
                    {
                        start_time: '1900',
                        end_time: '1130',
                        org_id: 1,
                        day_id: 1
                    },
                    {
                        start_time: '0900',
                        end_time: '2030',
                        org_id: 1,
                        day_id: 3
                    },
                    {
                        start_time: '1130',
                        end_time: '1430',
                        org_id: 1,
                        day_id: 3
                    },
                    {
                        start_time: '1900',
                        end_time: '1130',
                        org_id: 1,
                        day_id: 3
                    }
                ]
            });
        }

    }

    init() {
        this.insertDataInUserTable().then(async () => {
            await this.insertDataInOrgTable();
            await this.insertDataInAdminTable();
            await this.insertDataInServiceTable();
            await this.insertDataInProviderTable();
            await this.insertDataInOrgWorkTimeTable();
        }).then(async () => {
            await this.$disconnect();
        });
    }
}