import Todo from '../models/Todo';
import UI from '../components/UI';
import Validation from '../lib/Validation';
import Errors from '../lib/Errors';

/**
 * handle button click
 * display errors if any
 * collect form input, and delegate validation
 *  delegate todo persistence
 */
const todoSubmit = () => {

    // query button tag
    const btn = document.getElementById("btn");

    // add event to button tag
    btn.addEventListener("click", () => {
        /** 
         * initialize variables 
         * **/

        // set rules
        const rules = [{ title: 'required|min' }];
        // get input element
        const _input = document.getElementById("new-todo");
        // obtain input name
        const _name = _input.name;
        // obtain input value
        const newTodo = _input.value;

        /** Initialize errors object **/
        new Errors();

        // validate input, passing rules and input value.
        if(Validation.validate(rules, [{ _name: newTodo }])===true)
        {
            /**
             * If Validation passes then...
             * initialize Todo object and save new Todo
             * clear input UI
             */
            const todo = new Todo(newTodo);
            todo.save();
            UI.showTodo(todo);
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
        // add event to it plus its children (propgation)
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

    todoList.addEventListener('click', (e) => {
        UI.removeTodo(e.target);
    }, false);
};


export { todoSubmit, toggleCompleted, editTodo, removeTodo };