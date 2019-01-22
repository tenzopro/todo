import Todo from '../models/Todo';
import UI from '../components/UI';
import Validation from '../utils/Validation';
import Errors from './Errors';

const handleBtnClick = () => {
    
    const btn = document.getElementById("btn");

    btn.addEventListener("click", () => {

        const rules = [{ title: 'required|min' }];
        const _input = document.getElementById("new-todo");
        const _name = _input.name;
        const newTodo = _input.value;

        new Errors();

        if(Validation.validate(rules, [{ _name: newTodo }])===true)
        {
            const todo = new Todo(newTodo);
            // todo.save();
            // UI.showTodo(todo);
            _input.value = "";
            console.log('we good!');
        } else {
            console.log(Errors.errors);
        }
    });
};

export { handleBtnClick };