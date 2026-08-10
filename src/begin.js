import UI from './components/UI.js';
import { todoSubmit, toggleCompleted, editTodo, removeTodo, checkAll } from './controllers/Actions.js';

// display todos when DOM loads
window.document.addEventListener("DOMContentLoaded", function() {

	// initialize UI
	new UI;
	
	//display data
	UI.showTodos();

	// handle events
	todoSubmit();
	toggleCompleted();
	editTodo();
	removeTodo();
	checkAll();
});


  