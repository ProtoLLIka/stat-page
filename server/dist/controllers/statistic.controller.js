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
exports.Statistic = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const dataBaseService_1 = require("../dataBase/dataBaseService");
const utils_1 = require("../dataBase/utils");
let Statistic = class Statistic {
    constructor(appService, dbService) {
        this.appService = appService;
        this.dbService = dbService;
    }
    async getAboutUser(id) {
        if (!id) {
            return { error: 'id is required' };
        }
        return (await this.dbService.getAboutUser(id)).toString();
    }
    async getIntervalData(id, start, end, groupBy) {
        if (!id || !start || !end || !groupBy) {
            return { error: 'id is required' };
        }
        console.log('proceed');
        return await this.dbService.getChartData(id, start, end, groupBy);
    }
    async getTasksData(id, start, end) {
        if (!id || !start || !end) {
            return { error: 'id is required' };
        }
        return await this.dbService.getTasksDisc(id, start, end);
    }
};
__decorate([
    common_1.Get('/aboutUser'),
    __param(0, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Statistic.prototype, "getAboutUser", null);
__decorate([
    common_1.Get('/chartData'),
    __param(0, common_1.Query('id')), __param(1, common_1.Query('start', common_1.ParseIntPipe)), __param(2, common_1.Query('end', common_1.ParseIntPipe)), __param(3, common_1.Query('groupBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], Statistic.prototype, "getIntervalData", null);
__decorate([
    common_1.Get('/tasksDisc'),
    __param(0, common_1.Query('id')), __param(1, common_1.Query('start', common_1.ParseIntPipe)), __param(2, common_1.Query('end', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], Statistic.prototype, "getTasksData", null);
Statistic = __decorate([
    common_1.Controller('/statictic'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        dataBaseService_1.DataBaseService])
], Statistic);
exports.Statistic = Statistic;
//# sourceMappingURL=statistic.controller.js.map