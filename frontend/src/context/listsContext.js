import { createContext, useState } from "react";

const ListContext = createContext();

const ListProvider = ({children}) => {
    const [ todoList, setTodoList ] = useState({});

    const value = {
        todoList,
        setTodoList,
    }

    return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

export {ListContext, ListProvider}