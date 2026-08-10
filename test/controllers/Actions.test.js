jest.mock('../../src/components/UI', () => ({
    __esModule: true,
    default: {
        showTodo: jest.fn(),
        renderErrors: jest.fn(),
        toggleTodo: jest.fn(),
        editTodo: jest.fn(),
        removeTodo: jest.fn(),
        checkAll: jest.fn(),
    },
}));

jest.mock('../../src/models/Todo', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((title) => ({
        title,
        save: jest.fn(),
    })),
}));

import { todoSubmit, toggleCompleted, editTodo, removeTodo, checkAll } from '../../src/controllers/Actions';
import UI from '../../src/components/UI';
import Todo from '../../src/models/Todo';
import Errors from '../../src/lib/Errors';

describe('controller actions', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
        new Errors();
    });

    test('todoSubmit saves a valid todo and shows it in the UI', () => {
        const input = document.createElement('input');
        input.id = 'new-todo';
        input.name = 'title';
        input.value = 'Buy groceries';
        document.body.appendChild(input);

        const pretext = document.createElement('p');
        pretext.id = 'pretext';
        document.body.appendChild(pretext);

        todoSubmit();
        input.dispatchEvent(new Event('change'));

        expect(Todo).toHaveBeenCalledWith('Buy groceries');
        expect(UI.showTodo).toHaveBeenCalled();
        expect(input.value).toBe('');
        expect(pretext.isConnected).toBe(false);
    });

    test('todoSubmit renders validation errors for invalid todos', () => {
        const input = document.createElement('input');
        input.id = 'new-todo';
        input.name = 'title';
        input.value = '123';
        document.body.appendChild(input);

        todoSubmit();
        input.dispatchEvent(new Event('change'));

        expect(UI.renderErrors).toHaveBeenCalledWith(expect.any(Array));
        expect(Todo).not.toHaveBeenCalled();
    });

    test('toggleCompleted delegates click events to the UI', () => {
        const list = document.createElement('div');
        list.id = 'list-items';
        const target = document.createElement('span');
        target.className = 'checkbox';
        list.appendChild(target);
        document.body.appendChild(list);

        toggleCompleted();
        target.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(UI.toggleTodo).toHaveBeenCalledWith(target);
    });

    test('editTodo delegates double-click events to the UI', () => {
        const list = document.createElement('div');
        list.id = 'list-items';
        const target = document.createElement('span');
        target.className = 'todo-title';
        list.appendChild(target);
        document.body.appendChild(list);

        editTodo();
        target.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

        expect(UI.editTodo).toHaveBeenCalledWith(target);
    });

    test('removeTodo delegates click events to the UI', () => {
        const list = document.createElement('div');
        list.id = 'list-items';
        const target = document.createElement('button');
        target.className = 'delete';
        list.appendChild(target);
        document.body.appendChild(list);

        removeTodo();
        target.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(UI.removeTodo).toHaveBeenCalledWith(target);
    });

    test('checkAll delegates checkbox clicks to the UI', () => {
        const tickAll = document.createElement('input');
        tickAll.id = 'tick-untick-all';
        tickAll.type = 'checkbox';
        tickAll.checked = true;
        document.body.appendChild(tickAll);

        checkAll();
        tickAll.click();

        expect(UI.checkAll).toHaveBeenCalled();
        expect(UI.checkAll.mock.calls[0][0]).toBe(tickAll);
        expect(typeof UI.checkAll.mock.calls[0][1]).toBe('boolean');
    });
});
