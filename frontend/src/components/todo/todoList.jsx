import { useContext, useRef, useEffect } from "react";
import { deleteList } from "../../services/todoList";
import TodoItem from "./todoItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListContext } from "../../context/listsContext";
import { newTodo } from "../../services/todo";
import { TodoContext } from "../../context/todoContext";
import { TopicContext } from "../../context/topicsContext";
import { AlertContext } from "../../context/alertcontext";

export default function TodoList({ singleList, todosOfCurrentList, index }) {
  const { todoList, setTodoList } = useContext(ListContext);
  const { todo, setTodo } = useContext(TodoContext);
  const { topicToFetch } = useContext(TopicContext);
  const { setIsAlert, setAlertMessage, setSeverity } = useContext(AlertContext);

  console.log("todosOfCurrentList");
  console.log(todosOfCurrentList);

  useEffect(() => {
    console.log("Updated");
  }, [todoList]);
  const newTodoRef = useRef(null);
  useEffect(() => {
    console.log("todoList updated:", todo);
  }, [todo]);

  async function newTodoHandler() {
    console.log("INSIDE NEW TODO HANDLER");
    console.log(singleList._id);
    if (newTodoRef.current.value === "") {
      newTodoRef.current.focus();
      newTodoRef.current.placeholder = "Task cannot be empty!";
      return;
    }
    console.log(newTodoRef.current.value);

    const todoObject = {
      title: newTodoRef.current.value,
      dueDate: "1/1/1",
      starred: false,
      daily: false,
      remind:false,
      repeat:false,
      description:"",
    };
    try {
      const response = await newTodo(singleList._id, todoObject);
      if (response.status === "200") {
        //update todos context
        setTodo((prevTodos) => {
          console.log("prevTODOS");
          console.log(prevTodos);
          const safePrevTodos = Array.isArray(prevTodos) ? prevTodos : [];
          const updatedTodos = safePrevTodos.map((item) => {
            if (item.id === singleList._id) {
              return {
                ...item,
                data: [...item.data, response.newTodo],
              };
            }
            return item;
          });
          console.log("Logginf");
          console.log(updatedTodos);
          newTodoRef.current.value = ""
          return updatedTodos;
        });
      } else {
        setSeverity("error");
        setAlertMessage("Something went wrong.");
        setIsAlert(true);
        newTodoRef.current.value = ""
      }
    } catch (err) {
      newTodoRef.current.value = ""
      console.log(err);
    }
  }

  async function deleteListHandler() {
    const response = await deleteList(singleList._id);
    try {
      if (response.status === "200") {
        console.log("Inside delete list 200");
        // delete corresponding todos
        setTodoList((prevData) => {
          console.log(prevData);
          const updatedData = prevData.map((item) => {
            if (item.id === topicToFetch) {
              return {
                ...item,
                data: item.data.filter(
                  (subItem) => subItem._id !== singleList._id,
                ),
              };
            }
            return item;
          });
          return updatedData;
        });
      } else {
        setSeverity("error");
        setAlertMessage("Something went wrong.");
        setIsAlert(true);
      }
    } catch (err) {
        setSeverity("error");
        setAlertMessage("Something went wrong.");
        setIsAlert(true);
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
        <div className="flex w-full h-fit bg-white-300 border items-center">
          <input
            ref={newTodoRef}
            className=" w-full  pl-4  bg-white-300  border-white-300 
                        focus:border-white-400 hover:border-white-400
                        focus:outline-none focus:ring-0 font-roboto font-light 
                        text-white-900 placeholder-white-700"
            type="text"
            placeholder="Enter Task Here."
          />
          <div className="border-r h-10 my-2" />
          <div className="w-36 h-full flex justify-center items-center cursor-pointer"
               onClick={newTodoHandler}
          >
              <span className="w-fit h-full text-white-700">Add Task</span>
          </div>
        </div>
      </div>

      {todosOfCurrentList === null ||
      typeof todosOfCurrentList === "undefined" ||
      todosOfCurrentList[0].data.length === 0 ? (
        <div className="ml-4 mt-4 mb-4 font-roboto font-light text-white-900">
          The list is Empty
        </div>
      ) : (
        todosOfCurrentList[0].data?.map((item) => (
          <TodoItem key={item._id} singleTodo={item} />
        ))
      )}
    </div>
  );
}
