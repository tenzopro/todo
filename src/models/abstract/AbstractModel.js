
export default class Model 
{
    constructor(title)
    {
        let data = JSON.parse(localStorage.getItem("_todos"));
        this.todos =  (data) ? data : [];
        this.title = title;
        console.log(this.todos);
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

    setStore(data)
    {
        this.storeState(data);
    }

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

    save()
    {
        this.storeState();
        return this;
    }

    edit(id=null, title=null) 
    {
        if(id===null || title===null) 
        {
			return console.log("Update function expects exactly 1 arg. 0 passed");
        }
        
        let todo = this.store.filter(item => item.id === id );

        if(todo) 
        {
            todo.title = title;
            let newStore = [...this.store, edited];
            this.setStore(newStore);
            return true;
        } 
        
        return console.log('Cannot find todo');    
    }

    delete(id) 
    {
        if(id===null) 
        {
            return console.log("Remove function expects exactly 1 arg. 0 passed");
        }

        this.store = this.store.filter(todo => todo.id !== id );
        return true;
    }
}
