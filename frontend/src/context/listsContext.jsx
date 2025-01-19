import { createContext, useState } from "react";

const ListContext = createContext();

const ListProvider = ({children}) => {
    const [ todoList, setTodoList ] = useState(null);

    const value = {
        todoList,
        setTodoList,
    }

    return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

export {ListContext, ListProvider}