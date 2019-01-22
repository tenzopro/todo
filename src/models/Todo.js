import AbstractModel  from './abstract/AbstractModel';

/**
 * Extends model abstract
 * initializes instance properties
 */
export default class Todo extends AbstractModel 
{
	constructor(title = null) 
	{
		super();
	  	this.id = Math.floor(Math.random() * 100);
	  	this.title = title;
		this.completed = false;
	}
}
