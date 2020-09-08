import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseService, dbConfig, dbEntity } from './dataBase/dataBaseService';
import { Statistic } from './controllers/statistic.controller';
@Module({
    imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(dbConfig),
    TypeOrmModule.forFeature(dbEntity)],
    controllers: [Statistic],
    providers: [AppService, DataBaseService],
})
export class AppModule { }
