jest.mock('../src/components/UI', () => ({
    __esModule: true,
    default: Object.assign(jest.fn().mockImplementation(() => ({
        constructor: true,
    })), {
        showTodos: jest.fn(),
    }),
}));

jest.mock('../src/controllers/Actions', () => ({
    __esModule: true,
    todoSubmit: jest.fn(),
    toggleCompleted: jest.fn(),
    editTodo: jest.fn(),
    removeTodo: jest.fn(),
    checkAll: jest.fn(),
}));

import UI from '../src/components/UI';
import { todoSubmit, toggleCompleted, editTodo, removeTodo, checkAll } from '../src/controllers/Actions';

describe('main entry point', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        document.body.innerHTML = '';
    });

    test('initializes UI and controller actions on DOMContentLoaded', () => {
        require('../src/main');

        document.dispatchEvent(new Event('DOMContentLoaded'));

        const uiModule = require('../src/components/UI').default;
        const actionsModule = require('../src/controllers/Actions');

        expect(uiModule).toHaveBeenCalled();
        expect(uiModule.showTodos).toHaveBeenCalled();
        expect(actionsModule.todoSubmit).toHaveBeenCalled();
        expect(actionsModule.toggleCompleted).toHaveBeenCalled();
        expect(actionsModule.editTodo).toHaveBeenCalled();
        expect(actionsModule.removeTodo).toHaveBeenCalled();
        expect(actionsModule.checkAll).toHaveBeenCalled();
    });
});
