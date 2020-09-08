import { AppService } from '../app.service';
import { DataBaseService } from '../dataBase/dataBaseService';
import { GroupBy } from 'src/dataBase/utils';
export declare class Statistic {
    private readonly appService;
    private dbService;
    constructor(appService: AppService, dbService: DataBaseService);
    getAboutUser(id: any): Promise<any>;
    getIntervalData(id: string, start: number, end: number, groupBy: GroupBy): Promise<any>;
    getTasksData(id: string, start: number, end: number): Promise<string | {
        error: string;
    }>;
}
