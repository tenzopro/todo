import Errors from '../../src/lib/Errors';

beforeEach(() => {
    new Errors();
});

test('must be an object', () => {
    const errors = Errors.errors;
    expect(typeof errors).toBe('object');
    expect(errors).toMatchObject({});
});

test('must be an array', () => {
    const errors = Errors.get(); 
    expect(Array.isArray(errors)).toBe(true);
});

test('set error message', () => {
    Errors.set('error message');
    expect(Errors.errors.length).toBe(1);
});

test('get error messages', () => {
    Errors.set('error message one');
    Errors.set('error message two');
    const errors = Errors.get();
    expect(errors).toHaveLength(2);
    expect(errors.length).toBe(2)
});