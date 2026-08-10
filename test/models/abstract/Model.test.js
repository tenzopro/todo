jest.mock('../../../src/models/abstract/data/Store', () => ({
    __esModule: true,
    default: {
        todos: jest.fn(),
        save: jest.fn(),
    },
}));

import Model from '../../../src/models/abstract/Model';
import Store from '../../../src/models/abstract/data/Store';

describe('Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('constructor initializes the title and loads todos from the store', () => {
        const existingTodos = [{ id: 1, title: 'Existing', completed: false }];
        Store.todos.mockReturnValue(existingTodos);

        const model = new Model('New todo');

        expect(model.title).toBe('New todo');
        expect(model.todos).toEqual(existingTodos);
    });

    test('all returns the current todos from the store', () => {
        const existingTodos = [{ id: 1, title: 'Task', completed: false }];
        Store.todos.mockReturnValue(existingTodos);

        const model = new Model();

        expect(model.all()).toEqual(existingTodos);
    });

    test('get returns matching todos by id', () => {
        const existingTodos = [
            { id: 1, title: 'First', completed: false },
            { id: 2, title: 'Second', completed: true },
        ];
        Store.todos.mockReturnValue(existingTodos);

        const model = new Model();

        expect(model.get(2)).toEqual([existingTodos[1]]);
    });

    test('save stores the new todo state', () => {
        const existingTodos = [];
        Store.todos.mockReturnValue(existingTodos);

        const model = new Model('Buy milk');
        model.save();

        expect(Store.save).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                title: 'Buy milk',
                completed: false,
            }),
        ]));
    });

    test('editTitle updates the title and persists the change', () => {
        const existingTodos = [{ id: 1, title: 'Old', completed: false }];
        Store.todos.mockReturnValue(existingTodos);

        const model = new Model();
        model.editTitle(1, 'Updated');

        expect(model.todos[0].title).toBe('Updated');
        expect(Store.save).toHaveBeenCalledWith([
            { id: 1, title: 'Updated', completed: false },
        ]);
    });

    test('toggleCompleted flips completed and persists the change', () => {
        const existingTodos = [{ id: 1, title: 'Task', completed: false }];
        Store.todos.mockReturnValue(existingTodos);

        const model = new Model();
        model.toggleCompleted(1);

        expect(model.todos[0].completed).toBe(true);
        expect(Store.save).toHaveBeenCalledWith([
            { id: 1, title: 'Task', completed: true },
        ]);
    });

    test('delete persists the remaining todos', () => {
        const existingTodos = [
            { id: 1, title: 'First', completed: false },
            { id: 2, title: 'Second', completed: false },
        ];
        Store.todos.mockReturnValue(existingTodos);

        const model = new Model();
        model.delete(2);

        expect(Store.save).toHaveBeenCalledWith([
            { id: 1, title: 'First', completed: false },
        ]);
    });
});
