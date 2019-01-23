
/**
 * Handles all CRUD tasks
 * Abstracts methods for child models 
 * thru inheritance (all models inherit from Model class)
 */
export default class Model 
{
    constructor(title)
    {
        this.todos = JSON.parse(localStorage.getItem("_todos"));
        this.title = title;
    }

    storeState() 
    {
        this.todos.push({
            id: Math.floor(Math.random() * 100),
            title: this.title,
            completed: false
        });

        localStorage.setItem("_todos", JSON.stringify(this.todos));
    }

    updateStore(_todo)
    {
        let newTodos = this.todos.filter(todo => todo.id !== _todo[0].id);
        let newStore = [...newTodos, _todo[0]];
        this.todos = newStore;
        localStorage.setItem("_todos", JSON.stringify(newStore));
    }

    // returns all todos
    all() 
    {
        return this.todos;
    }

    get(id)
    {
        if(id===null) 
        {
			return console.log("function expects exactly 1 arg. 0 passed");
        }
        
        return this.store.filter(item => item.id === id );
    }

    /**
     * invokes setStore method which engages 
     * persistence storage 
     */
    save()
    {
        this.storeState();
    }

    editTitle(id, _title) 
    {
        let todo = this.store.filter(item => item.id === id );
        
        todo.title = _title;
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
        this.store = this.store.filter(todo => todo.id !== id );
        return true;
    }
}
