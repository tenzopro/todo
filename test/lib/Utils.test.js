import { isEmpty, isLessThan, mergeObjs, sortData } from '../../src/lib/Utils';

test('isEmpty must return boolean', () => {
    // return truthy 
    expect(isEmpty('')).toBe(true);
    expect(isEmpty()).toBe(true);
    expect(isEmpty(12)).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);

    // return falsey 
    expect(isEmpty('test string')).toBe(false);
    expect(isEmpty("-- %^&")).toBe(false);
    expect(isEmpty('123456')).toBe(false);
});

test('isLessThan must return boolean', () => {
    expect(isLessThan('123')).toBe(true);
    expect(isLessThan('12345')).toBe(true);
    expect(isLessThan('more characters')).toBe(false);
});

test('must merge objects', () => {
    const arr1 = {id: 1, val: '123'};
    const arr2 = [{id: 12, title: 'test obj'}];
    const merged = [...arr2, arr1];
    const count = mergeObjs(arr2, arr1).length;

    expect(mergeObjs(arr2, arr1)).toEqual(merged);
    expect(count).toBe(2);
});

// skipped sortData test