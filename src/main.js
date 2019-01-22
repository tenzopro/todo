import UI from './components/UI';
import { handleBtnClick } from './utils/actions';

// display todos when DOM loads
window.document.addEventListener("DOMContentLoaded", function() {
	//display data
	UI.showTodos();
});

// handle "add new todo" button click
handleBtnClick();
  