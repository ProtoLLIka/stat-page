import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { AppService } from '../app.service';
import { DataBaseService } from '../dataBase/dataBaseService';
import { GroupBy } from 'src/dataBase/utils';

@Controller('/statictic')
export class Statistic {
    constructor(
        private readonly appService: AppService,
        private dbService: DataBaseService) { }

    @Get('/aboutUser')
    async getAboutUser(@Query('id') id): Promise<any> {
        if (!id) {
            return { error: 'id is required' }
        }
        return (await this.dbService.getAboutUser(id)).toString();
    }

    @Get('/chartData')
    async getIntervalData(@Query('id') id: string, @Query('start', ParseIntPipe) start: number, @Query('end', ParseIntPipe) end: number, @Query('groupBy') groupBy: GroupBy): Promise<any> {
        if (!id || !start || !end || !groupBy) {
            return { error: 'id is required' }
        }
        console.log('proceed')
        return await this.dbService.getChartData(id, start, end, groupBy);
    }

    @Get('/tasksDisc')
    async getTasksData(@Query('id') id: string, @Query('start', ParseIntPipe) start: number, @Query('end', ParseIntPipe) end: number) {
        if (!id || !start || !end) {
            return { error: 'id is required' }
        }
        return await this.dbService.getTasksDisc(id, start, end);
    }

}