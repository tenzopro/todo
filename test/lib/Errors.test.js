import Errors from '../../src/lib/Errors';

describe('Errors', () => {
    beforeEach(() => {
        new Errors();
    });

    test('initializes an empty error collection', () => {
        expect(Errors.get()).toEqual([]);
        expect(Errors.errors).toEqual([]);
    });

    test('stores a single error message', () => {
        Errors.set('error message');

        expect(Errors.get()).toEqual(['error message']);
        expect(Errors.errors).toHaveLength(1);
    });

    test('stores multiple error messages in order', () => {
        Errors.set('error message one');
        Errors.set('error message two');

        expect(Errors.get()).toEqual(['error message one', 'error message two']);
        expect(Errors.errors).toHaveLength(2);
    });
});