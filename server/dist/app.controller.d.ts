import { AppService } from './app.service';
import { DataBaseService } from './dataBase/dataBaseService';
export declare class AppController {
    private readonly appService;
    private dbService;
    constructor(appService: AppService, dbService: DataBaseService);
    getData(): Promise<string>;
}
