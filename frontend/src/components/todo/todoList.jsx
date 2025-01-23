import { useContext, useRef, useEffect } from "react";
import { deleteList } from "../../services/todoList";
import TodoItem from "./todoItem";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ListContext } from "../../context/listsContext";
import { deleteTodo, newTodo } from "../../services/todo";
import { TodoContext } from "../../context/todoContext";

export default function TodoList({ singleList, todosOfCurrentList, index }) {
  const { setTodoList } = useContext(ListContext);
  const { todo, setTodo } = useContext(TodoContext);

  const newTodoRef = useRef(null);
    useEffect(() => {
      console.log("todoList updated:", todo);
    }, [todo]);
    
  async function newTodoHandler(){
    console.log('INSIDE NEW TODO HANDLER');
    console.log(singleList._id);
    if(newTodoRef.current.value === ''){
      newTodoRef.current.focus();
      newTodoRef.current.placeholder = 'Task cannot be empty!';
      return;
    }
    console.log(newTodoRef.current.value);

    const todoObject = {
      'title':newTodoRef.current.value,
      'dueDate':'1/1/1',
      'starred':false,
      'daily':false,
    }
    try {
      const response = await newTodo(singleList._id, todoObject);
      if(response.status === '200') {
        //update todos context
        setTodo( (prevTodos) => {
          const updatedTodos = {...prevTodos};
          console.log('Logginf');
          console.log(updatedTodos);
          if(updatedTodos === null) {
            updatedTodos[singleList._id] = response.newTodo;
          } else {
            updatedTodos[singleList._id] = [...updatedTodos[singleList._id],response.newTodo];  
          }
          return updatedTodos;
        });
      } else {
        console.log('Error creating todo')
      }
    } catch(err) {
      console.log(err);
    }

  }

  async function deleteListHandler() {
    const response = await deleteList(singleList._id);
    try {
      if (response.status === "200") {
        // delete corresponding todos
        setTodoList((prevData) =>
          prevData.filter((list) => list._id != singleList._id)
        );
      } else {
        console.log("DO Error Handling");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className={`felx flex-col pb-4 ml-4 mr-4 max-w-full h-fit rounded-sm shadow-xl bg-white-300 break-inside-avoid ${index !== 0 ? "mt-4" : ""}`}
    >
      <div className="flex flex-col">
        <div className=" flex justify-between w-full bg-white-400 p-4">
          <div className=" text-md  font-roboto font-light text-white-900">
            {singleList.title}
          </div>
          <span
            className="hover:scale-110 w-fit h-fit cursor-pointer"
            onClick={deleteListHandler}
          >
            <DeleteIcon sx={{ color: "#525252", fontSize: 30 }} />
          </span>
        </div>
        <div className="flex w-full h-fit bg-white-300 border">
          <input
            ref = {newTodoRef}
            className=" w-full  pl-4 py-2 bg-white-300  border-white-300 
                        focus:border-white-400 hover:border-white-400
                        focus:outline-none focus:ring-0 font-roboto font-light 
                        text-white-900 placeholder-white-700"
            type="text"
            placeholder="Enter Task Here."
          />
          <div className="border-r h-10 my-2" />
          <div className="w-48 h-full flex items-center justify-between px-4">
            <span className="h-fit w-fit ">
              <CalendarMonthIcon sx={{ color: "#525252",fontSize: 20 }} />
            </span>
            <div className="border-r h-10 my-2" />
            <button className="h-fit w-fit text-white-700 text-md" onClick={newTodoHandler} >Add Task</button>
          </div>
        </div>
      </div>

      {todosOfCurrentList === null ||
      typeof todosOfCurrentList === "undefined" ||
      todosOfCurrentList.length === 0 ? (
        <div className="ml-4 mt-4 mb-4 font-roboto font-light text-white-900">
          The list is Empty
        </div>
      ) : (
        todosOfCurrentList?.map((item) => (
          <TodoItem key={item._id} singleTodo={item} />
        ))
      )}
    </div>
  );
}
