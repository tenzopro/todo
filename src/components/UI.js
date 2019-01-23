import Todo from '../models/Todo';

/**
 * Class responsible for creating dynamic DOM elements:
 * todo list, alerts etc
 * ref: https://davidwalsh.name/documentfragment
 */
export default class UI 
{
	constructor(todos)
	{
		// init todos
		UI.todos = new Todo();

		// get div with id 'app' from index.html
		UI.appHook = document.getElementById("app");
		UI.ul = document.createElement("ul");
		UI.ul.setAttribute("id", "list-items");
	}

    static showTodos() 
    {
		// get todos
		const todos = UI.todos.all();

		// iterate through each todo and 
		//delegate DOM manipulation to showTodo()
		todos.map(todo => UI.showTodo(todo));
	}

	/**
	 * method responsible for creating new DOM nodes and 
	 * assigning todo values to list nodes.
	 * @param {*} todo 
	 */
    static showTodo(todo) 
    {
		// create a UL & LI elements
		const li = document.createElement("li");
		const input = document.createElement("input"); 
		const btn1 = document.createElement("button"); 
		const btn2 = document.createElement("button"); 

		// set attributes to elements
		input.setAttribute('type', 'checkbox'); 
		input.setAttribute('class', 'checkbox');
		input.setAttribute('value', todo.id);
		

		btn1.setAttribute('id', todo.id); 
		btn1.setAttribute('class', 'edit');
		btn1.innerHTML = "Edit";

		btn2.setAttribute('id', todo.id); 
		btn2.setAttribute('class', 'delete');
		btn2.innerHTML = "Delete";
		
		// append children to li tag
		li.innerHTML = todo.title;
		li.prepend(input);
		li.appendChild(btn1);
		li.appendChild(btn2);

		// then append the li to ul tag
		UI.ul.appendChild(li);

		// finally append the ul tag to the appHook
		UI.appHook.appendChild(UI.ul);
	}

	static toggleTodo(el)
	{
		if(el.classList.contains('checkbox'))
		{
			// update completed property
			UI.todos.toggleCompleted(el.value,);
			// update the UI
			el.parentElement.classList.toggle("true");
		}
	}

	static editTodo(el) 
	{
		if(el.classList.contains('edit'))
		{
			// edit todo
		}
	}

	static removeTodo(el) 
	{
		if(el.classList.contains('delete'))
		{
			el.parentElement.remove();
		}
	}


	/**
	 * displays errors when called
	 * @param {*} errorArray 
	 */
	static renderErrors(errorArray=[])
	{
		// ensure errorsAray is set
		if(errorArray.length === 0) 
		{
			// stop script if array is empty. log message
			return console.log('expect error array not to be empty');
		}

		// hook to alerts section in index.html
		const alerts = document.getElementById('display-alerts');
		
		// create a ul tag
		let ul = document.createElement("ul");

		// loop thru errors
		errorArray.forEach(error => {
			// create li element each time
			let li = document.createElement("li");

			// add error text to li element
			li.innerHTML = error;

			// append it immediately to the ul tag
			ul.appendChild(li);
		});

		// append the ul tag to allerts div
		alerts.appendChild(ul);
	}
}
