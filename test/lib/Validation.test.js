import Validation from '../../src/lib/Validation';
import Errors from '../../src/lib/Errors';
import { isLessThan } from '../../src/lib/Utils';

beforeEach(() => {
    new Errors();
});

test('lessThan must return boolean', () => {
    const truthy = Validation.hasLessThan('123');
    const falsy = Validation.hasLessThan('123456');

    expect(truthy).toBeTruthy();
    expect(falsy).toBeFalsy();
});

test('empty must return boolean', () => {
    
    expect(Validation.isEmpty()).toBeTruthy();
    expect(Validation.isEmpty('')).toBeTruthy();
    expect(Validation.isEmpty('some value')).toBeFalsy();
});

test('required must return boolean', () => {
    const falsey = Validation.required({ name: ''}, 'title');
    const truthy = Validation.required({ name: 'go to store'}, 'title');

    expect(falsey).toEqual(false);
    expect(truthy).toBe(true);
});

test('min must return boolean', () => {
    
    expect(Validation.min({ name: '123456'}, 'title')).toBe(true);
    expect(Validation.min({ name: '123'}, 'title')).toBe(false);
});

test('validate returns boolean', () => {
    const rules = [{ title: 'required|min'}]; // good
    const data = [{ name: 'go to store '}] // good
    const emptyData = [{ name: ''}] // empty data set - false
    const lessData = [{ name: '123'}] // less than required min - false

    expect(Validation.validate(rules, data)).toBe(true);
    expect(Validation.validate(rules, emptyData)).toBe(false);
    expect(Validation.validate(rules, lessData)).toBe(false);
});
