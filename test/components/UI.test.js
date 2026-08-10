jest.mock('../../src/models/Todo.js', () => ({
    __esModule: true,
    default: class {
        constructor() {
            this.todos = [];
        }

        all() {
            return this.todos;
        }

        save() {}
        update() {}
        delete() {}
        editTitle() {}
        toggleCompleted() {}
    },
}));

import UI from '../../src/components/UI.js';

describe('UI footer count', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="app"></div>
            <div id="tick-untick-all"></div>
            <div id="instruction"></div>
            <div id="item-count"></div>
        `;
        document.getElementById('item-count').innerHTML = '<small><span>0</span> item(s)</small>';
        document.getElementById('instruction').innerHTML = '<small></small>';
    });

    test('showTodo adds the item to the in-memory list and updates the footer count', () => {
        const ui = new UI();
        ui.appHook = document.getElementById('app');
        ui.table = document.createElement('table');
        ui.table.setAttribute('id', 'list-items');
        ui.appHook.appendChild(ui.table);

        const todo = { id: 7, title: 'New task', completed: false };
        UI.todos = [todo];
        UI.showTodo(todo);

        expect(UI.todos).toEqual([todo]);
        expect(document.querySelector('#item-count span').textContent).toBe('1');
    });

    test('checkAll marks every visible todo checkbox as checked', () => {
        const ui = new UI();
        ui.appHook = document.getElementById('app');
        ui.table = document.createElement('table');
        ui.table.setAttribute('id', 'list-items');
        ui.appHook.appendChild(ui.table);

        const firstTodo = { id: 1, title: 'First', completed: false };
        const secondTodo = { id: 2, title: 'Second', completed: false };
        UI.todos = [firstTodo, secondTodo];

        const firstCheckbox = document.createElement('input');
        firstCheckbox.setAttribute('type', 'checkbox');
        firstCheckbox.setAttribute('class', 'checkbox');
        firstCheckbox.setAttribute('value', firstTodo.id);

        const secondCheckbox = document.createElement('input');
        secondCheckbox.setAttribute('type', 'checkbox');
        secondCheckbox.setAttribute('class', 'checkbox');
        secondCheckbox.setAttribute('value', secondTodo.id);

        ui.table.appendChild(document.createElement('tr'));
        ui.table.firstChild.appendChild(document.createElement('td'));
        ui.table.firstChild.firstChild.appendChild(firstCheckbox);

        ui.table.appendChild(document.createElement('tr'));
        ui.table.lastChild.appendChild(document.createElement('td'));
        ui.table.lastChild.firstChild.appendChild(secondCheckbox);

        const footerCheckbox = document.createElement('input');
        footerCheckbox.setAttribute('id', 'tick-untick-all');
        footerCheckbox.setAttribute('type', 'checkbox');
        document.body.appendChild(footerCheckbox);

        UI.checkAll(footerCheckbox, true);

        expect(firstCheckbox.checked).toBe(true);
        expect(secondCheckbox.checked).toBe(true);
        expect(UI.todos.every(todo => todo.completed)).toBe(true);
    });
});
