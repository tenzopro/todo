import Todo from '../models/Todo';
import { isEmpty } from '../lib/Utils';

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
		UI.table = document.createElement("table");
		UI.table.setAttribute("id", "list-items");
	}

    static showTodos() 
    {
		// get todos
		const todos = UI.todos.all();

		if(!todos) 
		{
			const preText = `
				<span>You have no todos yet :)</span><br/><br/>
				<small>(Type into box and click on + button)</small>
			`;

			const p = document.createElement("p");
			p.setAttribute('id', 'pretext');
			p.innerHTML = preText;
			UI.appHook.appendChild(p);
			return;
		}
		
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
		/**
		 * create table, tr & td elements
		 */
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		const td1 = document.createElement("td");
		const td2 = document.createElement("td");
		const input = document.createElement("input"); 
		const span = document.createElement("span"); 
		const btn = document.createElement("button"); 

		/**
		 * set attributes 
		 */
		tr.setAttribute('class', todo.completed);

		input.setAttribute('type', 'checkbox'); 
		input.setAttribute('class', 'checkbox');
		input.setAttribute('value', todo.id);

		span.setAttribute('class', 'todo-title');
		span.setAttribute('id', todo.id);
		span.innerHTML = todo.title;

		btn.setAttribute('id', todo.id); 
		btn.setAttribute('class', 'delete');
		btn.innerHTML = "X";
		
		/**
		 * append children
		 */
		td.prepend(input);
		td1.appendChild(span);
		td2.appendChild(btn);
		
		tr.appendChild(td);
		tr.appendChild(td1);
		tr.appendChild(td2);

		UI.table.appendChild(tr);

		/**
		 * finally append table to appHook
		 */
		UI.appHook.appendChild(UI.table);
	}

	static toggleTodo(el)
	{
		// select only element(s) with 'checkbos' class attrs
		if(el.classList.contains('checkbox'))
		{
			// update completed property
			UI.todos.toggleCompleted(el.value);
			// update the UI
			el.parentElement.parentElement.classList.toggle("true");
		}
	}

	static editTodo(el) 
	{
		if(el.classList.contains('todo-title'))
		{
			// edit todo
			const newTitleText = prompt("Enter new todo title");

			if(isEmpty(newTitleText) == true) 
			{
				return;
			}

			UI.todos.editTitle(el.id, newTitleText);
			el.innerHTML = newTitleText;
		}
	}

	static removeTodo(el) 
	{
		if(el.classList.contains('delete'))
		{
			UI.todos.delete(el.id);
			el.parentElement.parentElement.remove();
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

		setTimeout(() => {
			alerts.remove()
		}, 3000);
	}
}
