import { createContext, useState } from "react";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState(null);
  const [ todoInDetail, setTodoInDetail ] = useState(null);

  const value = {
    todo,
    setTodo,
    todoInDetail,
    setTodoInDetail,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export { TodoContext, TodoProvider };
