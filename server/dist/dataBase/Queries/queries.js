"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSolutionByUserId = void 0;
exports.getSolutionByUserId = `
SELECT 
    solutions.date,
    tasks.name,
    ROUND(solutions.score_to_show_cf * tasks.weight / 100) AS score
FROM
    solutions
        JOIN
    pupil ON solutions.pupil_id = pupil.id
        JOIN
    tasks ON solutions.task_id = tasks.id
WHERE
    solutions.solved = 1 AND pupil.id = 1
ORDER BY solutions.date;`;
//# sourceMappingURL=queries.js.map