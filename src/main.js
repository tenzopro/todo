import UI from './components/UI';
import { todoSubmit, toggleCompleted, editTodo, removeTodo } from './controllers/Actions';

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
});


  