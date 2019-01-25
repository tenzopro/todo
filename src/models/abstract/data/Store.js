const Store = (function() {

    const db =  JSON.parse(localStorage.getItem("_todos")); 

    const getTodos = () => {
        
        if(anyData(db)==false) 
        {
            dbInit();
        } 
        return db;
    };

    const saveData = (data) => {
        localStorage.setItem("_todos", JSON.stringify(data));
    };

    const dbInit = () => {
        const _id = Math.floor(Math.random() * 100);
        const data = JSON.stringify([
            { id: _id, title: "You're up & running!", completed: false }
        ]);
        localStorage.setItem('_todos', data);
    };

    const anyData = (data) => {
        return (data==null || data==undefined) ? false : true;
    };

    return {
        todos: getTodos,
        save: saveData
    };
}());

export default Store;

