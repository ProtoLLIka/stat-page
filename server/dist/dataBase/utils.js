"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillData = exports.getNextDateOf = exports.getStartDateOf = exports.getTimeInterval = exports.getQueryForDiscription = exports.getQueryAboutUser = exports.getQueryForIntervals = void 0;
const interval_1 = require("./dto/interval");
function getQueryForIntervals(id, start, end) {
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
        solutions.date BETWEEN ${start / 1000} AND ${end / 1000};`;
}
exports.getQueryForIntervals = getQueryForIntervals;
function getQueryAboutUser(id) {
    return `SELECT MIN(date) * 1000 AS data FROM solutions WHERE pupil_id = ${id}`;
}
exports.getQueryAboutUser = getQueryAboutUser;
function getQueryForDiscription(id, start, end) {
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
        solutions.date BETWEEN ${start / 1000} AND ${end / 1000};`;
}
exports.getQueryForDiscription = getQueryForDiscription;
function getTimeInterval(start, end, groupBy) {
    let result = [];
    let currentDate = getStartDateOf(groupBy, start);
    while (currentDate <= end) {
        console.log(currentDate);
        let data = new interval_1.Interval();
        data.start = currentDate;
        data.end = getNextDateOf(groupBy, currentDate);
        data.value = 0;
        result.push(data);
        currentDate = getNextDateOf(groupBy, currentDate);
    }
    return result;
}
exports.getTimeInterval = getTimeInterval;
function getStartDateOf(type, date) {
    switch (type) {
        case 'day': {
            return date;
        }
        case 'month': {
            let currentDate = new Date(date);
            return currentDate.setDate(1);
        }
        case 'week': {
            let currentDate = new Date(date);
            return currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        }
        default: {
            throw new Error(`Type ${type} not found. Send it as 'week', 'month', or 'day'`);
        }
    }
}
exports.getStartDateOf = getStartDateOf;
function getNextDateOf(type, date) {
    switch (type) {
        case 'day': {
            let result = new Date(date).setDate(new Date(date).getDate() + 1);
            return result;
        }
        case 'month': {
            let result = new Date(date).setMonth(new Date(date).getMonth() + 1);
            result = new Date(result).setDate(1);
            return result;
        }
        case 'week': {
            let result = new Date(date).setDate(new Date(date).getDate() + 7);
            return result;
        }
        default: {
            throw new Error(`Type ${type} not found. Send it as 'week', 'month', or 'day'`);
        }
    }
}
exports.getNextDateOf = getNextDateOf;
function fillData(intervals, data) {
    intervals.forEach(i => {
        let sum;
        sum = 0;
        data.forEach(j => {
            if (new Date(i.start) < new Date(j.date) && new Date(j.date) < new Date(i.end)) {
                sum = sum + j.score;
            }
        });
        i.value = sum;
    });
    return intervals;
}
exports.fillData = fillData;
//# sourceMappingURL=utils.js.map