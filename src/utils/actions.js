import Todo from '../models/Todo';
import UI from '../components/UI';
import Validation from '../utils/Validation';
import Errors from './Errors';

/**
 * handle button click
 * display errors if any
 * collect form input, and delegate validation
 *  delegate todo persistence
 */
const handleBtnClick = () => {

    // query but tag
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

export { handleBtnClick };