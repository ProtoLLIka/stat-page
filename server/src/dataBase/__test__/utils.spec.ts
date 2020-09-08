import { getStartDateOf, getNextDateOf, GroupBy } from "../utils"

// describe('getStartOf', () => {
//     const tmpls = [
//         { input: { type: 'week', date: 'Wed, 12 Aug 2020 05:55:43 GMT' }, output: 'Mon, 10 Aug 2020 00:00:00 GMT' },
//     ]

//     tmpls.forEach(({ input, output }) => {
//         it(`when date is ${input.date} and we search start of ${input.type}, then result is ${output}`, () => {
//             expect(getStartOf(input.type as GroupBy, new Date(input.date)).toUTCString()).toBe(output);
//         })
//     })
// })

describe('getStartOf', () => {
    const tmpls = [
        { input: { type: 'week', date: 'Wed Aug 12 2020 12:17:58 GMT+0000' }, output: 'Mon Aug 10 2020 12:17:58 GMT+0000' },
        { input: { type: 'week', date: 'Wed Aug 26 2020 12:19:58 GMT+0000' }, output: 'Mon Aug 24 2020 12:19:58 GMT+0000' },
        { input: { type: 'month', date: 'Wed Aug 12 2020 12:17:58 GMT+0000' }, output: 'Sat Aug 01 2020 12:17:58 GMT+0000' },
        { input: { type: 'month', date: 'Mon Feb 24 2020 12:20:39 GMT+0000' }, output: 'Sat Feb 01 2020 12:20:39 GMT+0000' },
    ]

    tmpls.forEach(({ input, output }) => {
        it(`when date is ${input.date} and we search start of ${input.type}, then result is ${output}`, () => {
            const date = getStartDateOf(input.type as GroupBy, new Date(input.date));
            expect(date).toStrictEqual(new Date(output));
        })
    })

})

describe('getNextDateOf', () => {
    const tmpls = [
        { input: { type: 'week', date: 'Mon Aug 10 2020 12:17:58 GMT+0000' }, output: 'Mon Aug 17 2020 12:17:58 GMT+0000' },
        { input: { type: 'week', date: 'Mon Aug 24 2020 12:19:58 GMT+0000' }, output: 'Mon Aug 31 2020 12:19:58 GMT+0000' },
        { input: { type: 'month', date: 'Sat Aug 01 2020 12:17:58 GMT+0000' }, output: 'Mon Sep 01 2020 12:17:58 GMT+0000' },
        { input: { type: 'month', date: 'Sat Feb 01 2020 12:20:39 GMT+0000' }, output: 'Sun Mar 01 2020 12:20:39 GMT+0000' },
    ]

    tmpls.forEach(({ input, output }) => {
        it(`when date is ${input.date} and we search start of ${input.type}, then result is ${output}`, () => {
            const date = getNextDateOf(input.type as GroupBy, new Date(input.date));
            console.log(date)
            expect(date).toStrictEqual(new Date(output));
        })
    })

})