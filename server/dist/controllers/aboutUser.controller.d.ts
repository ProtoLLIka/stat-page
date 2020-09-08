import { AppService } from '../app.service';
import { DataBaseService } from '../dataBase/dataBaseService';
export declare class AboutUser {
    private readonly appService;
    private dbService;
    constructor(appService: AppService, dbService: DataBaseService);
    getData(id: any): Promise<any>;
}
