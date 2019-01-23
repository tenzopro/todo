import UI from './components/UI';
import { HandleBtnClick, toggleCompleted } from './utils/Actions';

// display todos when DOM loads
window.document.addEventListener("DOMContentLoaded", function() {
	// initialize UI
	new UI;
	
	//display data
	UI.showTodos();

	// handle "add new todo" button click
	HandleBtnClick();
	toggleCompleted();
});


  