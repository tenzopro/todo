import AbstractModel  from './abstract/AbstractModel';

// todo model
export default class Todo extends AbstractModel 
{
	constructor(title = null) 
	{
		super();
	  	this.id = Math.floor(Math.random() * 100);
	  	this.title = title;
	  	this.completed = false;
	}

	static get(id=null) 
	{
		return AbstractModel.getTodo(id);
	}

	static all()
	{
		return AbstractModel.getTodos();
	}

	save() 
	{
		if(this.title === null) {
			return console.log("cannot pass empty model title");
		}
		const data = { id: this.id, title: this.title, completed: this.completed };
		AbstractModel.addTodo(data);
		return this;
	}

	static update(id, title) 
	{
		return AbstractModel.editTodo(id, title);
	}

	static remove(id=null) 
	{
		return AbstractModel.deleteTodo(id);
	}
}
