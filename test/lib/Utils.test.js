import { isEmpty, isLessThan, mergeObjs, sortData } from '../../src/lib/Utils';

describe('Utils', () => {
    test('isEmpty returns true for empty or non-string values', () => {
        expect(isEmpty('')).toBe(true);
        expect(isEmpty()).toBe(true);
        expect(isEmpty('   ')).toBe(true);
        expect(isEmpty(12)).toBe(true);
        expect(isEmpty({})).toBe(true);
        expect(isEmpty([])).toBe(true);
    });

    test('isEmpty returns false for non-empty strings', () => {
        expect(isEmpty('test string')).toBe(false);
        expect(isEmpty('-- %^&')).toBe(false);
        expect(isEmpty('123456')).toBe(false);
    });

    test('isLessThan returns true for short strings', () => {
        expect(isLessThan('123')).toBe(true);
        expect(isLessThan('12345')).toBe(true);
    });

    test('isLessThan returns false for strings of length 6 or more', () => {
        expect(isLessThan('123456')).toBe(false);
        expect(isLessThan('more characters')).toBe(false);
    });

    test('mergeObjs removes the existing object with the same id and appends the new one', () => {
        const existing = [{ id: 1, title: 'first' }, { id: 2, title: 'second' }];
        const updated = { id: 2, title: 'updated' };

        expect(mergeObjs(existing, updated)).toEqual([
            { id: 1, title: 'first' },
            { id: 2, title: 'updated' },
        ]);
    });

    test('sortData sorts todos by title', () => {
        const todos = [
            { title: 'Zebra' },
            { title: 'Apple' },
            { title: 'Mango' },
        ];

        expect(sortData(todos)).toEqual([
            { title: 'Apple' },
            { title: 'Mango' },
            { title: 'Zebra' },
        ]);
    });
});