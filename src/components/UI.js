import Todo from '../models/Todo';

// create DOM elements ref: https://davidwalsh.name/documentfragment
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

	static renderErrors(errorArray=[])
	{
		if(errorArray.length === 0) 
		{
			return console.log('expect error array not to be empty');
		}

		const alerts = document.getElementById('display-alerts');
		let ul = document.createElement("ul");

		errorArray.forEach(error => {
			let li = document.createElement("li");
			li.innerHTML = error;
			ul.appendChild(li);
		});

		alerts.appendChild(ul);
	}
}
