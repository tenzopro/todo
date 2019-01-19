
export default class AbstractModel {
    
    constructor()
    {
        AbstractModel.store = JSON.parse(localStorage.getItem("_todos")) || "[]";      
    }

    static storeState(data) 
    {
        // console.log(data);
        console.log(AbstractModel.store);
        AbstractModel.store.push(data);
        console.log(AbstractModel.store);
        localStorage.setItem("_todos", JSON.stringify(AbstractModel.store));
    }

    static setStore(data)
    {
        // console.log(data);
        AbstractModel.storeState(data);
    }

    static getTodos() {
        return localStorage.getItem("_todos");
    }

    static getTodo(id){
        if(id===null) {
			return console.log("function expects exactly 1 arg. 0 passed");
		}
        return AbstractModel.store.filter(item => item.id === id );
    }

    static editTodo(id=null, title=null) {
        if(id===null || title===null) {
			return console.log("Update function expects exactly 1 arg. 0 passed");
		}
        let todo = AbstractModel.store.filter(item => item.id === id );
        if(todo) {
            todo.title = title;
            let newStore = [...this.store, edited];
            this.setStore(newStore);
            return true;
        } 
        
        return console.log('Cannot find todo');    
    }

    static addTodo(data)
    {
        // console.log(data);
        AbstractModel.setStore(data);
        return true;
    }

    deleteTodo(id) 
    {
        if(id===null) {
            return console.log("Remove function expects exactly 1 arg. 0 passed");
        }
        this.store = AbstractModel.store.filter(todo => todo.id !== id );
        return true;
    }
}
