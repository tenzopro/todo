describe('Store', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.resetModules();
    });

    test('returns todos from storage when they already exist', () => {
        const existingTodos = [{ id: 1, title: 'Existing task', completed: false }];
        localStorage.setItem('_todos', JSON.stringify(existingTodos));

        const Store = require('../../../../src/models/abstract/data/Store').default;

        expect(Store.todos()).toEqual(existingTodos);
    });

    test('initializes a default todo when storage is empty and persists it', () => {
        const Store = require('../../../../src/models/abstract/data/Store').default;

        const todos = Store.todos();

        expect(todos).toHaveLength(1);
        expect(todos[0]).toEqual(expect.objectContaining({
            title: "You're up & running!",
            completed: false,
        }));
        expect(JSON.parse(localStorage.getItem('_todos'))).toEqual(todos);
    });

    test('save writes todo data to localStorage', () => {
        const Store = require('../../../../src/models/abstract/data/Store').default;
        const payload = [{ id: 7, title: 'Saved task', completed: true }];

        Store.save(payload);

        expect(JSON.parse(localStorage.getItem('_todos'))).toEqual(payload);
    });
});
