import Todo from '../models/Todo';

export default class UI 
{
    static showTodos() 
    {
		UI.state = JSON.parse(Todo.all());
		UI.state.map(todo => UI.showTodo(todo));
	}

    static showTodo(todo) 
    {
	    const appHook = document.getElementById("app");
	    const ul = document.createElement("ul");
		const li = document.createElement("li");

		li.innerHTML = todo.title;
		ul.appendChild(li);
		appHook.appendChild(ul);
	}
}
