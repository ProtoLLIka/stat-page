import { FactoryProvider } from '@nestjs/common';
import { Solutions } from './dto/solution';
import { Repository } from 'typeorm';
import { GroupBy } from './utils';
export declare const dbConfig: FactoryProvider;
export declare const dbEntity: (typeof Solutions)[];
export declare class DataBaseService {
    private solutions;
    constructor(solutions: Repository<Solutions>);
    getAboutUser(id: string): Promise<string>;
    getChartData(id: string, start: number, end: number, groupBy: GroupBy): Promise<string>;
    getTasksDisc(id: string, start: number, end: number): Promise<string>;
}
