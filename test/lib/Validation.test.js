import Validation from '../../src/lib/Validation';
import Errors from '../../src/lib/Errors';

describe('Validation', () => {
    beforeEach(() => {
        new Errors();
    });

    test('hasLessThan returns true for short values', () => {
        expect(Validation.hasLessThan('123')).toBe(true);
        expect(Validation.hasLessThan('12345')).toBe(true);
    });

    test('hasLessThan returns false for values of length 6 or more', () => {
        expect(Validation.hasLessThan('123456')).toBe(false);
        expect(Validation.hasLessThan('long value')).toBe(false);
    });

    test('isEmpty returns true for empty values', () => {
        expect(Validation.isEmpty()).toBe(true);
        expect(Validation.isEmpty('')).toBe(true);
    });

    test('isEmpty returns false for non-empty values', () => {
        expect(Validation.isEmpty('some value')).toBe(false);
    });

    test('required returns false when the field is empty', () => {
        expect(Validation.required({ name: '' }, 'title')).toBe(false);
        expect(Errors.get()).toContain('title is required');
    });

    test('required returns true for a populated field', () => {
        expect(Validation.required({ name: 'go to store' }, 'title')).toBe(true);
    });

    test('min returns false when the value is too short', () => {
        expect(Validation.min({ name: '123' }, 'title')).toBe(false);
        expect(Errors.get()).toContain('title must be more than 5 characters.');
    });

    test('min returns true when the value meets the minimum length', () => {
        expect(Validation.min({ name: '123456' }, 'title')).toBe(true);
    });

    test('validate returns true for valid data', () => {
        const rules = [{ title: 'required|min' }];
        const data = [{ name: 'go to store' }];

        expect(Validation.validate(rules, data)).toBe(true);
    });

    test('validate returns false when a required field is empty', () => {
        const rules = [{ title: 'required|min' }];
        const data = [{ name: '' }];

        expect(Validation.validate(rules, data)).toBe(false);
    });

    test('validate returns false when a value is below the minimum length', () => {
        const rules = [{ title: 'required|min' }];
        const data = [{ name: '123' }];

        expect(Validation.validate(rules, data)).toBe(false);
    });
});
