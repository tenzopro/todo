import Todo from '../models/Todo';

/**
 * Class responsible for creating dynamic DOM elements:
 * todo list, alerts etc
 * ref: https://davidwalsh.name/documentfragment
 */
export default class UI 
{
	// display todos from Todo model
    static showTodos() 
    {
		// initize todos
		const todos = new Todo();
		
		// parse json from todo model
		UI.state = todos.all();

		// iterate through each todo and delegate DOM manipulation to showTodo()
		UI.state.map(todo => UI.showTodo(todo));
	}

	/**
	 * method responsible for creating new DOM nodes and 
	 * assigning todo values to list nodes.
	 * @param {*} todo 
	 */
    static showTodo(todo) 
    {
		/**
		 * initialize variables:
		 * hook to app id in index.html
		 * create ul, li elements
		 * append children to each respectively
		 */

		 // get div with id 'app' from index.html
		const appHook = document.getElementById("app");
		
		// create a UL & LI elements
	    const ul = document.createElement("ul");
		const li = document.createElement("li");
		const input = document.createElement("input"); 
		const btn1 = document.createElement("button"); 
		const btn2 = document.createElement("button"); 

		// add attributes
		input.setAttribute('type', 'checkbox'); 
		input.setAttribute('id', 'checkbox');

		btn1.setAttribute('id', todo.id); 
		btn1.setAttribute('id', 'btn1');
		btn1.innerHTML = "Edit";

		btn2.setAttribute('id', todo.id); 
		btn2.setAttribute('id', 'btn2');
		btn2.innerHTML = "Delete";
		
		// append children to li tag
		li.innerHTML = todo.title;
		li.appendChild(input);
		li.appendChild(btn1);
		li.appendChild(btn2);

		// then append the li to ul tag
		ul.appendChild(li);

		// finally append the ul tag to the appHook
		appHook.appendChild(ul);
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
