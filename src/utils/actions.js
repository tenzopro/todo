import Todo from '../models/Todo';
import UI from '../components/UI';

const handleBtnClick = () => {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", () => {
        let _input = document.getElementById("new-todo");
        let newTodo = _input.value;
        const todo = new Todo(newTodo);
        todo.save();
        UI.showTodo(todo);
        _input.value = "";
    });
};

export { handleBtnClick };