"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseService = exports.dbEntity = exports.dbConfig = void 0;
const common_1 = require("@nestjs/common");
const solution_1 = require("./dto/solution");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("./utils");
exports.dbConfig = {
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
            entities: exports.dbEntity,
        };
    },
};
exports.dbEntity = [
    solution_1.Solutions
];
let DataBaseService = class DataBaseService {
    constructor(solutions) {
        this.solutions = solutions;
    }
    async getAboutUser(id) {
        const dbDate = JSON.parse(JSON.stringify(await this.solutions.query(utils_1.getQueryAboutUser(id))))[0]['data'];
        console.log('Были полученны данные с БД:', dbDate);
        return JSON.stringify({ id: id, minDate: parseInt(dbDate) });
    }
    async getChartData(id, start, end, groupBy) {
        const intervals = utils_1.getTimeInterval(start, end, groupBy);
        console.log(intervals);
        const dbDate = JSON.parse(JSON.stringify(await this.solutions.query(utils_1.getQueryForIntervals(id, start, end)))).map(function (el) {
            return {
                date: new Date(parseInt(el['date'])).getTime(),
                score: parseInt(el.score)
            };
        });
        console.log('Были полученны данные с БД для графика:', dbDate);
        return JSON.stringify(utils_1.fillData(intervals, dbDate));
    }
    async getTasksDisc(id, start, end) {
        const dbDate = JSON.parse(JSON.stringify(await this.solutions.query(utils_1.getQueryForDiscription(id, start, end)))).map(function (el) {
            return el;
        });
        console.log('Были полученны данные с БД для описания:', dbDate);
        return JSON.stringify(dbDate);
    }
};
DataBaseService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(solution_1.Solutions)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DataBaseService);
exports.DataBaseService = DataBaseService;
//# sourceMappingURL=dataBaseService.js.map