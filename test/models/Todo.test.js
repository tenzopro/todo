jest.mock('../../src/models/abstract/data/Store', () => ({
    __esModule: true,
    default: {
        todos: jest.fn(),
        save: jest.fn(),
    },
}));

import Todo from '../../src/models/Todo';
import Store from '../../src/models/abstract/data/Store';

describe('Todo model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('constructor stores the title and loads existing todos', () => {
        const existingTodos = [{ id: 1, title: 'Existing task', completed: false }];
        Store.todos.mockReturnValue(existingTodos);

        const todo = new Todo('New task');

        expect(todo.title).toBe('New task');
        expect(todo.todos).toEqual(existingTodos);
    });

    test('save adds a new todo and persists it', () => {
        Store.todos.mockReturnValue([]);

        const todo = new Todo('Groceries');
        todo.save();

        expect(Store.save).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                title: 'Groceries',
                completed: false,
            }),
        ]));
    });

    test('get returns todos matching the provided id', () => {
        const existingTodos = [
            { id: 1, title: 'First', completed: false },
            { id: 2, title: 'Second', completed: true },
        ];
        Store.todos.mockReturnValue(existingTodos);

        const todo = new Todo();

        expect(todo.get(2)).toEqual([existingTodos[1]]);
    });

    test('editTitle updates the todo title and persists the change', () => {
        const existingTodos = [{ id: 1, title: 'Old title', completed: false }];
        Store.todos.mockReturnValue(existingTodos);

        const todo = new Todo();
        todo.editTitle(1, 'New title');

        expect(todo.todos[0].title).toBe('New title');
        expect(Store.save).toHaveBeenCalledWith([
            { id: 1, title: 'New title', completed: false },
        ]);
    });

    test('toggleCompleted flips the completed state and persists it', () => {
        const existingTodos = [{ id: 1, title: 'Task', completed: false }];
        Store.todos.mockReturnValue(existingTodos);

        const todo = new Todo();
        todo.toggleCompleted(1);

        expect(todo.todos[0].completed).toBe(true);
        expect(Store.save).toHaveBeenCalledWith([
            { id: 1, title: 'Task', completed: true },
        ]);
    });

    test('delete removes the todo and persists the remaining list', () => {
        const existingTodos = [
            { id: 1, title: 'First', completed: false },
            { id: 2, title: 'Second', completed: false },
        ];
        Store.todos.mockReturnValue(existingTodos);

        const todo = new Todo();
        todo.delete(2);

        expect(Store.save).toHaveBeenCalledWith([{ id: 1, title: 'First', completed: false }]);
    });
});
