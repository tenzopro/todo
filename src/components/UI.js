import Todo from '../models/Todo';
import { isEmpty, setTableRowAttrs, setCheckboxAttrs } from '../lib/Utils';
import UIBase from './UIBase';

/**
 * Class responsible for creating dynamic DOM elements:
 * todo list, alerts etc
 * ref: https://davidwalsh.name/documentfragment
 */
export default class UI extends UIBase
{
	constructor(todos)
	{
		super()

		// init todos
		UI.todo = new Todo();
		UI.todos = UI.todo.all().sort( (a, b) => a.title.localeCompare(b.title) );

		// get div with id 'app' from index.html
		UI.appHook = document.getElementById("app");
		UI.table = document.createElement("table");
		UI.table.setAttribute("id", "list-items");

		UI.iniFooter();
	}

    static showTodos() 
    {
		if(!UI.todos) 
		{
			/**
			 * If no todos then show theres no todos:
			 */

			// set notification variable
			const preText = '<span>You have no todos yet :)</span>';

			// 1. create notification element - p tag
			// 2. set its attributes
			// 3. append to the parent element
			// 4. terminate script
			const p = document.createElement("p");
			p.setAttribute('id', 'pretext');
			p.innerHTML = preText;
			UI.appHook.appendChild(p);

			return;
		}
		
		// iterate through each todo and 
		//delegate DOM manipulation to showTodo()
		UI.todos.map(todo => UI.showTodo(todo));
	}

	/**
	 * method responsible for creating new DOM nodes and 
	 * assigning todo values to list nodes.
	 * @param {*} todo 
	 */
    static showTodo(todo) 
    {
		// reset flag 
		UI.resetFlag(todo)
		 
		// update footer & its variables
		UI.iniFooter();

		// create html elems (tr, td, input, span, button)
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		const td1 = document.createElement("td");
		const td2 = document.createElement("td");
		const input = document.createElement("input"); 
		const span = document.createElement("span"); 
		const btn = document.createElement("button"); 

		if(todo.completed == true)
		{
			// check checkbox input if todo is completed
			input.setAttribute('checked', 'checked');

			// apply a 'true' class
			tr.setAttribute('class', todo.completed);
		}

		input.setAttribute('type', 'checkbox'); 
		input.setAttribute('class', 'checkbox');
		input.setAttribute('value', todo.id);

		span.setAttribute('class', 'todo-title');
		span.setAttribute('id', todo.id);
		span.innerHTML = todo.title;

		btn.setAttribute('id', todo.id); 
		btn.setAttribute('class', 'delete');
		btn.innerHTML = "X";
		
		//append children to tds
		td.prepend(input);
		td1.appendChild(span);
		td2.appendChild(btn);
		
		// append tds to tr
		tr.appendChild(td);
		tr.appendChild(td1);
		tr.appendChild(td2);

		// append tr to table
		UI.table.appendChild(tr);

		// finally append table to main parent
		UI.appHook.appendChild(UI.table);
	}

	static toggleTodo(el)
	{
		// select only element(s) with 'checkbos' class attrs
		if(el.classList.contains('checkbox'))
		{
			// update completed property
			UI.todo.toggleCompleted(el.value);
			// update the UI
			el.parentElement.parentElement.classList.toggle("true");
		}
	}

	static editTodo(el) 
	{
		// if parent element has class of one of the 
		// elements we're looking for in its class list
		if(el.classList.contains('todo-title'))
		{
			// prompt user to supply new title text
			const newTitleText = prompt("Enter new todo title");

			// ensure input is not empty
			if(isEmpty(newTitleText) == true) 
			{
				// terminate script if input is empty
				return;
			}

			// otherwise update db 
			// then also update UI
			UI.todo.editTitle(el.id, newTitleText);
			el.innerHTML = newTitleText;
		}
	}

	static removeTodo(el) 
	{
		// if parent element has class of one of the 
		// elements we're looking for in its class list
		if(el.classList.contains('delete'))
		{
			// attempt to delete todo from DB
			UI.todo.delete(el.id);

			// update copy of in-memory todos to ensure we retain
			// consistency by removing the deleted todo from array
			// or returning all todos except for the just-deleted todo
			// then save rest back in todos array
			UI.todos = UI.todos.filter(todo => todo.id != el.id );

			// update the UI also
			el.parentElement.parentElement.remove();

			// ensure the stats on footer reflect this change
			UI.iniFooter();
		}
	}

	static checkAll(status)
	{
		const tableRows = document.querySelector('#list-items').childNodes;
		const checkBoxes = document.querySelectorAll('.checkbox');

		let checked = (status===true) ? 'checked' : false;

		UI.setTableRowAttrs(tableRows, status, checked);
		UI.setCheckboxAttrs(checkBoxes, status, checked);

		UI.todos.map( todo => todo.completed = status );
		UI.todo.update(UI.todos);
	}

	static iniFooter()
	{
		// initialize variables
		const checkAllElem = document.querySelector('#tick-untick-all');
		const itemCount = document.querySelector('#item-count');
		const instruction = document.querySelector('#instruction');
		const instructionNote = '* double-click title to edit';
		const todoCount = UI.todos.length;
		
		// set values if there are todos (item count & instruction note)
		itemCount.childNodes[1].childNodes[0].innerHTML = UI.todos.length;
		
		if(todoCount > 0)
		{
			instruction.childNodes[1].innerHTML = instructionNote;
		}

		UI.resetCheckAll(checkAllElem, UI.checkAllFlag);
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
			return console.log('error array empty');
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

		// clear msgs after 5 secs
		setTimeout(() => {
			alerts.remove()
		}, 5000);
	}
}
