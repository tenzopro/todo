
export default class AbstractModel {
    
    constructor()
    {
        let data = localStorage.getItem("_todos");
        this.store = (data) ? data : [];     
    }

    storeState(data) 
    {
        this.store.push(data);
        localStorage.setItem("_todos", JSON.stringify(this.store));
    }

    setStore(data)
    {
        this.storeState(data);
    }

    all() {
        return localStorage.getItem("_todos");
    }

    get(id){
        if(id===null) {
			return console.log("function expects exactly 1 arg. 0 passed");
		}
        return this.store.filter(item => item.id === id );
    }

    edit(id=null, title=null) {
        if(id===null || title===null) {
			return console.log("Update function expects exactly 1 arg. 0 passed");
		}
        let todo = this.store.filter(item => item.id === id );
        if(todo) {
            todo.title = title;
            let newStore = [...this.store, edited];
            this.setStore(newStore);
            return true;
        } 
        
        return console.log('Cannot find todo');    
    }

    save()
    {
        return this;
    }

    delete(id) 
    {
        if(id===null) {
            return console.log("Remove function expects exactly 1 arg. 0 passed");
        }
        this.store = this.store.filter(todo => todo.id !== id );
        return true;
    }
}
