import { Interval } from "./dto/interval";
import { Answer } from "./dto/answer";

export function getQueryForIntervals(id: string, start: number, end: number): string {
    return `
    SELECT 
        solutions.date * 1000 AS date,
        ROUND(solutions.score_to_show_cf * tasks.weight / 100) AS score
    FROM
        solutions
    JOIN
        tasks ON solutions.task_id = tasks.id
    WHERE
        solutions.solved = 1 AND solutions.pupil_id  = ${id} AND
        solutions.date BETWEEN ${start / 1000} AND ${end / 1000};`
}

export function getQueryAboutUser(id: string): string {
    return `SELECT MIN(date) * 1000 AS data FROM solutions WHERE pupil_id = ${id}`
}

export function getQueryForDiscription(id: string, start: number, end: number): string {
    return `
    SELECT 
        solutions.date * 1000 AS date,
        tasks.name AS name,
        ROUND(solutions.score_to_show_cf * tasks.weight / 100) AS score
    FROM
        solutions
    JOIN
        tasks ON solutions.task_id = tasks.id
    WHERE
        solutions.solved = 1 AND solutions.pupil_id  = ${id} AND
        solutions.date BETWEEN ${start / 1000} AND ${end / 1000};`
}

export type GroupBy = 'week' | 'month' | 'day'

export function getTimeInterval(start: number, end: number, groupBy: GroupBy): any {
    let result = []
    let currentDate = getStartDateOf(groupBy, start);
    while (currentDate <= end) {
        console.log(currentDate)
        let data = new Interval();
        data.start = currentDate;
        data.end = getNextDateOf(groupBy, currentDate);
        data.value = 0;
        result.push(data);
        currentDate = getNextDateOf(groupBy, currentDate)
    }
    return result
}


export function getStartDateOf(type: GroupBy, date: number): number {
    switch (type) {
        case 'day': {
            return date
        }
        case 'month': {
            let currentDate = new Date(date)
            return currentDate.setDate(1)
        }
        case 'week': {
            let currentDate = new Date(date)
            return currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
        }
        default: {
            throw new Error(`Type ${type} not found. Send it as 'week', 'month', or 'day'`);
        }
    }
}

export function getNextDateOf(type: GroupBy, date: number): number {
    switch (type) {
        case 'day': {
            let result = new Date(date).setDate(new Date(date).getDate() + 1)
            return result;
        }
        case 'month': {
            let result = new Date(date).setMonth(new Date(date).getMonth() + 1)
            result = new Date(result).setDate(1)
            return result;
        }
        case 'week': {
            let result = new Date(date).setDate(new Date(date).getDate() + 7)
            return result;
        }
        default: {
            throw new Error(`Type ${type} not found. Send it as 'week', 'month', or 'day'`);
        }
    }
}

export function fillData(intervals: Interval[], data: Answer[]): Interval[] {
    intervals.forEach(i => {
        let sum: number;
        sum = 0
        data.forEach(j => {
            if (new Date(i.start) < new Date(j.date) && new Date(j.date) < new Date(i.end)) {
                sum = sum + j.score as number;
            }
        });
        i.value = sum;
    });
    return intervals
}
