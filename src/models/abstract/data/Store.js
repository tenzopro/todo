const Store = (function() {
    
    const _data = localStorage.getItem("_todos");

    const anyData = (data) => {
        return (data==null) ? false : true;
    }

    const getTodos = () => {
    
        if(anyData(_data)===false) 
        {
            const _id = Math.floor(Math.random() * 100);
            const data = JSON.stringify([
                { id: _id, title: "You're up & running!", completed: false }
            ]);
            localStorage.setItem('_todos', data);
            return JSON.parse(localStorage.getItem("_todos"));
        } 
        else {
            return JSON.parse(localStorage.getItem("_todos"));
        }
    };

    const saveData = (data) => {
        localStorage.setItem("_todos", JSON.stringify(data));
    };

    return {
        todos: getTodos,
        save: saveData
    };
}());

export default Store;

