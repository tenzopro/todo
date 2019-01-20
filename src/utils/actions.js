import Todo from '../models/Todo';
import UI from '../components/UI';
import Validation from '../utils/Validation';

const handleBtnClick = () => {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", () => {
        const rules = [{ title: 'required|min' }];
        const _input = document.getElementById("new-todo");
        const _name = _input.name;
        const newTodo = _input.value;

        const validation = new Validation();

        if(validation.validate(rules, [{ _name: newTodo }])===true)
        {
            const todo = new Todo(newTodo);
            // todo.save();
            // UI.showTodo(todo);
            _input.value = "";
            console.log('we good!');
        } else {
            console.log(validation._errors);
        }
    });
};

export { handleBtnClick };