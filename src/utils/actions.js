import Todo from '../models/Todo';
import UI from '../components/UI';
import Validation from './Validation';
import Errors from './Errors';

/**
 * handle button click
 * display errors if any
 * collect form input, and delegate validation
 *  delegate todo persistence
 */
const HandleBtnClick = () => {

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

    // selectlist item wrapper - ul tag
    const todoList = document.querySelector('#list-items');

    // add event to it plus its children (propgation)
    todoList.addEventListener('click', (e) => {
        // delegate action to UI toggle action -
        // passing the clicked element
        UI.toggleTodo(e.target);
    }, false);
};

const removeTodo = () => {

    // selectlist item wrapper
    const todoList = document.querySelector('#list-items');

    todoList.addEventListener('click', (e) => {
        UI.removeTodo(e.target);
    }, false);
};

/**
 * check if field value is empty or not
 * @param {*} field 
 * returns @bool true/false
 */
const isEmpty = (field=null) => {
    return (field ===null || field.trim().length===0) ? true : false;
};

/**
 * checks if field has characters less or equal to 5:
 * a minimum required for any input field
 * @param {*} field 
 * returns @bool true/false
 */
const isLessThan = (field=null) => {
    return (field.length <= 5) ? true : false;
};

export { HandleBtnClick, toggleCompleted, removeTodo, isEmpty, isLessThan };