import Todo from '../models/Todo.js';
import { isEmpty } from '../lib/Utils.js';
import UIBase from './UIBase.js';

/**
 * Class responsible for creating dynamic DOM elements:
 * todo list, alerts etc
 * ref: https://davidwalsh.name/documentfragment
 */
export default class UI extends UIBase
{
	constructor(todos)
	{
		super();

		// init todos
		UI.todo = new Todo();
		UI.todos = UI.todo.all().sort( (a, b) => a.title.localeCompare(b.title) );

		if(UI.todos.length == 0) 
		{
			// checkall flag
			UIBase.checkAllFlag = false;
		}
		// get div with id 'app' from index.html
		UI.appHook = document.getElementById("app");
		UI.table = document.createElement("table");
		UI.table.setAttribute("id", "list-items");

		UI.iniFooter();
	}

    static showTodos() 
    {
		UI.appHook.innerHTML = '';
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
		// Normalize the incoming todo payload so render logic can safely use either
		// a single todo object or a model instance with an .all() collection.
		const todoData = (todo && Array.isArray(todo.todos))
			? todo.all().slice(-1)[0]
			: todo;

		if(todo && Array.isArray(todo.todos)) {
			// Sync the UI cache from the model-backed collection before rendering.
			UI.todos = todo.all().slice().sort((a, b) => a.title.localeCompare(b.title));
		}

		// reset flag 
		UI.resetFlag(todoData)
		 
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

		if(todoData.completed == true)
		{
			// check checkbox input if todo is completed
			input.setAttribute('checked', 'checked');

			// apply a 'true' class
			tr.setAttribute('class', todoData.completed);
		}

		input.setAttribute('type', 'checkbox'); 
		input.setAttribute('class', 'checkbox');
		input.setAttribute('value', todoData.id);

		span.setAttribute('class', 'todo-title');
		span.setAttribute('id', todoData.id);
		span.innerHTML = todoData.title;

		btn.setAttribute('id', todoData.id); 
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

		// finally append table to main parent and refresh the footer count
		// so the visible count stays in sync with the list that was just rendered.
		UI.appHook.appendChild(UI.table);
		UI.iniFooter();
	}

	static toggleTodo(el)
	{
		// select only element(s) with 'checkbos' class attrs
		if(el.classList.contains('checkbox'))
		{
			// update completed property
			UI.todo.toggleCompleted(el.value);
			// Refresh the cached todo list after the toggle so the footer count
			// reflects the current completed-state snapshot.
			UI.todos = UI.todo.all();

			// update the UI
			el.parentElement.parentElement.classList.toggle("true");
			UI.iniFooter();

			// if one of todos is unchecked 
			if(el.checked == false) 
			{
				// then uncheck 'check all' checkbox
				const tickAll = document.querySelector('#tick-untick-all');
				tickAll.checked = false;
			}
		}
	}

	static editTodo(el) 
	{
		// if parent element has class of one of the 
		// elements we're looking for in its class list
		if(el.classList.contains('todo-title'))
		{
			// prompt user to supply new title text
			const newTitleText = prompt("Enter new todo title", el.innerHTML);

			// ensure input is not empty
			if(isEmpty(newTitleText) == true) 
			{
				// terminate script if input is empty
				return;
			}

			// otherwise update db 
			// then also update UI
			UI.todo.editTitle(el.id, newTitleText);
			// Refresh the in-memory list after an edit so the footer count remains accurate.
			UI.todos = UI.todo.all();
			UI.iniFooter();
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

	static checkAll(element, status)
	{
		const list = document.querySelector('#list-items');
		const tableRows = list ? list.childNodes : [];
		const checkBoxes = document.querySelectorAll('.checkbox');
		const isChecked = Boolean(status);

		// Apply the footer checkbox state to each visible todo row so the UI
		// and the underlying todo objects stay in sync when “check all” is used.
		Array.from(tableRows).forEach(row => {
			if(row && row.setAttribute) {
				row.setAttribute('class', isChecked ? 'true' : 'false');
			}
		});

		Array.from(checkBoxes).forEach(checkbox => {
			// Set the checkbox state explicitly so the row inputs reflect the footer toggle.
			checkbox.checked = isChecked;
			checkbox.setAttribute('checked', isChecked ? 'checked' : '');
		});

		// Update the cached todo objects so the model-backed state matches the UI selection.
		UI.todos = (UI.todos || []).map(todo => ({ ...todo, completed: isChecked }));
		UI.todo.update(UI.todos);
		UIBase.checkAllFlag = isChecked;
		
		if(element) {
			element.checked = isChecked;
			element.classList.toggle('true', isChecked);
		}
	}

	static iniFooter()
	{
		// initialize variables
		const checkAllElem = document.querySelector('#tick-untick-all');
		const itemCount = document.querySelector('#item-count');
		const instruction = document.querySelector('#instruction');
		const instructionNote = '* double-click title to edit';
		const todoCount = UI.todos.length;
		const itemCountValue = itemCount ? itemCount.querySelector('span') : null;
		const instructionValue = instruction ? instruction.querySelector('small') : null;
		
		// set values if there are todos (item count & instruction note)
		// Update the footer count from the current UI todo cache so it stays in sync
		// with the rendered list immediately after add/remove/toggle/edit actions.
		if(itemCountValue) {
			itemCountValue.innerHTML = UI.todos.length;
		}
		
		if(todoCount > 0 && instructionValue)
		{
			instructionValue.innerHTML = instructionNote;
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
