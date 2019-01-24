import Store from './data/Store';
import { mergeObjs } from '../../lib/Utils'

/**
 * Handles all CRUD tasks
 * Abstracts methods for child models 
 * thru inheritance (all models inherit from Model class)
 */
export default class Model 
{
    constructor(title)
    {
        this.todos = Store.todos();
        this.title = title;
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

    updateStore(_todo)
    {
        const newStore = mergeObjs(this.todos, _todo);
        Store.save(newStore);
        // let newTodos = this.todos.filter(todo => todo.id !== _todo[0].id);
        // let newStore = [...newTodos, _todo[0]];
        // localStorage.setItem("_todos", JSON.stringify(newStore));
    }

    // returns all todos
    all() 
    {
        return this.todos;
    }

    get(id)
    {
        return this.todos.filter(item => item.id === id );
    }

    /**
     * invokes setStore method which engages 
     * persistence storage when saving NEW todo
     */
    save()
    {
        this.storeState();
    }

    editTitle(id, newTitleText) 
    {
        let todo = this.todos.filter(item => item.id == id );
        todo[0].title = newTitleText;
        this.updateStore(todo);
    }

    toggleCompleted(id)
    {
        let todo = this.todos.filter(item => item.id == id );
        todo[0].completed = !todo[0].completed;
        this.updateStore(todo);
    }

    delete(id) 
    {
        this.todos = this.store.filter(todo => todo.id !== id );
        return true;
    }
}

