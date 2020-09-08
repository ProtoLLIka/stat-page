"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
describe('getStartOf', () => {
    const tmpls = [
        { input: { type: 'week', date: 'Wed, 12 Aug 2020 05:55:43 GMT' }, output: 'Mon, 10 Aug 2020 05:56:23 GMT' },
    ];
    tmpls.forEach(({ input, output }) => {
        it(`when date is ${input.date} and we search start of ${input.type}, then result is ${output}`, () => {
            expect(utils_1.getStartOf(input.type, new Date(input.date))).toBe(output);
        });
    });
});
//# sourceMappingURL=utils.js.map