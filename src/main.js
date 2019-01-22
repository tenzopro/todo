import UI from './components/UI';
import { HandleBtnClick } from './utils/Actions';

// display todos when DOM loads
window.document.addEventListener("DOMContentLoaded", function() {
	
	//display data
	UI.showTodos();
});

// handle "add new todo" button click
HandleBtnClick();
  