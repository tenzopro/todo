import Todo from '../models/Todo.js';
import UI from '../components/UI.js';
import Validation from '../lib/Validation.js';
import Errors from '../lib/Errors.js';

/**
 * handle button click
 * display errors if any
 * collect form input, and delegate validation
 *  delegate todo persistence
 */
const todoSubmit = () => {
    
    // query button tag
    // const btn = document.getElementById("btn");
    const _input = document.getElementById("new-todo");

    // add event to button tag
    _input.addEventListener("change", (e) => {
        
        /** 
         * initialize variables 
         * **/

        // set rules
        const rules = [{ title: 'required|min' }];
        // get input element
        // const _input = document.getElementById("new-todo");
        // obtain input name
        const name = _input.name;
        // obtain input value
        const newTodo = _input.value.trim();

        /** Initialize errors object **/
        new Errors();

        // validate input, passing rules and input value.
        if(Validation.validate(rules, [{ name: newTodo }]))
        {
            const p = document.querySelector('#pretext');
            /**
             * If Validation passes then...
             * initialize Todo object and save new Todo
             * clear input UI
             */
            const todo = new Todo(newTodo);
            todo.save();
            // Keep the UI's in-memory todo list in sync with the newly saved item
            // so the footer count and rendered rows reflect the current state immediately.
            const newTodoItem = {
                id: Date.now(),
                title: newTodo,
                completed: false
            };
            UI.todos = [...(UI.todos || []), newTodoItem].sort((a, b) => a.title.localeCompare(b.title));
            UI.todo = todo;
            UI.todo.todos = UI.todos;
            (p) ? p.remove() : null;
            UI.showTodo(newTodoItem);
            _input.value = "";
        } else {
            /**
             * Otherwise render errors on UI
             */
            UI.renderErrors(Errors.get());
        }
    });
};

const toggleCompleted = () => {

    const todoList = document.querySelector('#list-items');

    if(todoList)
    {
        // add event to the node AND all its children (propagation)
        todoList.addEventListener('click', (e) => {
            /**
             * delegate action to UI toggle action -
             * passing the clicked element
             */
            UI.toggleTodo(e.target);
        }, false);
    }
};

const editTodo = () => {

    const todoList = document.querySelector('#list-items');

    if(todoList)
    {
        todoList.addEventListener('dblclick', (e) => {
            /**
             * delegate action to UI edit action -
             * passing the clicked element
             */
            UI.editTodo(e.target);
        }, false);
    }
};

const removeTodo = () => {

    // selectlist item wrapper
    const todoList = document.querySelector('#list-items');
    
    if(todoList)
    {
        todoList.addEventListener('click', (e) => {
            
            UI.removeTodo(e.target);
        }, false);
    }
};

const checkAll = () => {
    const tickAll = document.querySelector('#tick-untick-all');
    
    if(tickAll) {
        // Listen for the checkbox change event so the footer toggle updates
        // every todo row as soon as the user checks or unchecks it.
        tickAll.addEventListener('change', (e) => {
            UI.checkAll(tickAll, e.target.checked);
        });
    }
};


export { todoSubmit, toggleCompleted, editTodo, removeTodo, checkAll };