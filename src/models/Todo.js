import Model  from './abstract/Model';

/**
 * Extends model abstract
 * initializes instance properties
 */
export default class Todo extends Model 
{
	constructor(title = null) 
	{
		super(title);
	}
}
