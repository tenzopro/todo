const Store = (function() {

    const getTodos = () => {
        const db = JSON.parse(localStorage.getItem("_todos"));

        if(anyData(db)==false) 
        {
            dbInit();
            return JSON.parse(localStorage.getItem("_todos"));
        } 
        return db;
    };

    const saveData = (data) => {
        localStorage.setItem("_todos", JSON.stringify(data));
    };

    const dbInit = () => {
        const _id = Math.floor(Math.random() * 100);
        const data = [
            { id: _id, title: "You're up & running!", completed: false }
        ];
        saveData(data);
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

