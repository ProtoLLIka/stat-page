import { Injectable, FactoryProvider } from '@nestjs/common';
import { Solutions } from './dto/solution';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getRepository } from 'typeorm';
import { getQueryForIntervals, GroupBy, getTimeInterval, fillData, getQueryAboutUser, getQueryForDiscription } from './utils';
import { TaskChartDisc } from './dto/taskChartDisc';
import { Interval } from './dto/interval';
import { Answer } from './dto/answer';
import { AboutUser } from './dto/aboutUser';
import { parse } from 'path';
export const dbConfig: FactoryProvider = {
    provide: 'DB_CONFIG',
    useFactory: () => {
        return {
            type: 'mysql',
            host: 'sql7.freemysqlhosting.net',
            port: 3306,
            username: 'sql7361837',
            password: 'lAHsbnDkFk',
            database: 'sql7361837',
            synchronize: false,
            logging: false,
            entities: dbEntity,
        };
    },
};
export const dbEntity = [
    Solutions
];
@Injectable()
export class DataBaseService {
    constructor(
        @InjectRepository(Solutions)
        private solutions: Repository<Solutions>,
    ) { }

    async getAboutUser(id: string): Promise<string> {
        const dbDate = JSON.parse(JSON.stringify(await this.solutions.query(getQueryAboutUser(id))))[0]['data']
        console.log('Были полученны данные с БД:', dbDate)
        return JSON.stringify({ id: id, minDate: parseInt(dbDate) } as AboutUser);
    }

    async getChartData(id: string, start: number, end: number, groupBy: GroupBy): Promise<string> {
        const intervals = getTimeInterval(start, end, groupBy);
        console.log(intervals)
        const dbDate = JSON.parse(JSON.stringify(await this.solutions.query(getQueryForIntervals(id, start, end)))).map(function (el) {
            return {
                date: new Date(parseInt(el['date'])).getTime(),
                score: parseInt(el.score)
            } as Answer;
        });
        console.log('Были полученны данные с БД для графика:', dbDate)
        return JSON.stringify(fillData(intervals, dbDate))
    }

    async getTasksDisc(id: string, start: number, end: number): Promise<string> {
        const dbDate = JSON.parse(JSON.stringify(await this.solutions.query(getQueryForDiscription(id, start, end)))).map(function (el) {
            return el as TaskChartDisc;
        });
        console.log('Были полученны данные с БД для описания:', dbDate)
        return JSON.stringify(dbDate)
    }
}
