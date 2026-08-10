import Store from './data/Store.js';
import { mergeObjs } from '../../lib/Utils.js';

/**
 * Handles all CRUD tasks
 * Abstracts methods for child models 
 * thru inheritance (all models inherit from Model class)
 */
export default class Model 
{
    constructor(title)
    {
        this.title = title;
        this.todos = Store.todos();
    }

    // returns all todos
    all() 
    {
        return this.todos;
    }

    get(id)
    {
        return this.todos.filter(item => item.id == id );
    }

    /**
     * invokes storeState method which engages 
     * persistence storage when saving NEW todo
     */
    save()
    {
        this.storeState();
    }

    storeState() 
    {
        this.todos.push({
            id: Math.floor(Math.random() * 100),
            title: this.title,
            completed: false
        });
        
        Store.save(this.todos);
    }

    update(data)
    {
        Store.save(data);
    }

    editTitle(id, newTitleText) 
    {
        const todo = this.todos.filter(item => item.id == id );

        if(todo.length === 0) {
            return;
        }

        todo[0].title = newTitleText;
        this.updateStore(todo);
    }

    updateStore(_todo)
    {
        // update - merge data and save it to store
        const newStore = mergeObjs(this.todos, _todo[0]);
        Store.save(newStore);
    }

    toggleCompleted(id)
    {
        const todo = this.todos.filter(item => item.id == id );

        if(todo.length === 0) {
            return;
        }

        todo[0].completed = !todo[0].completed;
        this.updateStore(todo);
    }

    delete(_id) 
    {
        const remainingTodos = this.todos.filter( todo => todo.id != _id );
        Store.save(remainingTodos);
    }
}

