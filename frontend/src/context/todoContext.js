import { createContext, useState } from "react";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [ todo, setTodo ] = useState({});

    const value  = {
        todo,
        setTodo,
    };

    return<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export {TodoContext, TodoProvider}