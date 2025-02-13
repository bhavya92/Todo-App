import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useContext, useEffect,useState } from "react";
import { DetailSidebarContext } from "../../context/detailBar";
import { TodoContext } from "../../context/todoContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTodo, updateTodo } from "../../services/todo";

export default function TodoItem({ singleTodo }) {

  const { setDetailBarContent, setIsDetailVisible  } = useContext(DetailSidebarContext);
  const { setTodoInDetail,todo,setTodo  } = useContext(TodoContext);
  const [isStarred, setIsStarred] = useState(null);
  const [ repeat, setRepeat ] = useState(null);
  
  useEffect( ()=>{
    setIsStarred(singleTodo.starred);
    setRepeat(singleTodo.daily);
  },[])

  useEffect( ()=>{
    setIsStarred(singleTodo.starred);
    setRepeat(singleTodo.daily);
  },[todo])

  function displayTodoHandler() {
    setDetailBarContent('todo');
    setTodoInDetail(singleTodo);
    setIsDetailVisible(true);
  }

  async function deleteTodoHandler(e){
    e.stopPropagation();
    console.log("deleting todo")
    console.log("original todo");
    console.log(todo);
    const response = await deleteTodo(singleTodo._id);
    if(response.status === '200') {
      let newTodo = todo.map((list) => ({
        ...list,
        data : list.data.filter( (item) => 
            item._id !== singleTodo._id)
      }));
      console.log(`single todo `)
      console.log(singleTodo)
      console.log(newTodo)
      
      //check newTodo for next element, if exists display that else show topic list
      let parentObject = todo.find(list => list.id === singleTodo.todoList.id) ;
      let indexRemoved =  parentObject.data.findIndex(item => item._id === singleTodo._id);
      if(indexRemoved < parentObject.data.length-1) {
        console.log("Inside if");
        console.log(parentObject.data[indexRemoved + 1]);
        setTodoInDetail(parentObject.data[indexRemoved + 1]);
      } else {
        setIsDetailVisible(false);
        setDetailBarContent('topics');
      }
      console.log(parentObject.data[indexRemoved]);
      console.log(`parent object`);
      console.log(parentObject);
      setTodo(newTodo);
    } else {
      setSeverity("error");
      setAlertMessage("Error deleting todo.");
      setIsAlert(true);
    }
  }

  async function starTodoHandler(event){
    event.stopPropagation();
    let newTodoObject = {
      ...singleTodo,
      starred:!(isStarred)
    }
    console.log(newTodoObject);
    const response = await updateTodo(singleTodo._id, newTodoObject);
    if(response.status === '200') {
      let updatedTodos =todo.map((list) => ({
        ...list,
        data: list.data.map( (item)=> 
          item._id === singleTodo._id ? {...item, ...newTodoObject} : item
        )
      }));
      setTodo(updatedTodos);
      setIsStarred((prev) => !prev);
      singleTodo.starred = isStarred;
      console.log(`starred in todoItem is ${singleTodo.starred}`);
      setTodoInDetail(newTodoObject);
    } else {
      setSeverity("error");
      setAlertMessage("Error updating todo.");
      setIsAlert(true);
    }
  }

  async function repeatTodoHandler(event){
    event.stopPropagation();
    let newTodoObject = {
      ...singleTodo,
      daily:!(repeat)
    }
    console.log(newTodoObject);
    const response = await updateTodo(singleTodo._id, newTodoObject);
    if(response.status === '200') {
      let updatedTodos =todo.map((list) => ({
        ...list,
        data: list.data.map( (item)=> 
          item._id === singleTodo._id ? {...item, ...newTodoObject} : item
        )
      }));
      setTodo(updatedTodos);
      setRepeat((prev) => !prev);
      setTodoInDetail(newTodoObject);
    } else {
      setSeverity("error");
      setAlertMessage("Error updating todo.");
      setIsAlert(true);
    }
  }

  return (
    <div className="transition-all duration-300 cursor-pointer 
                    ease-in-out px-2 flex items-center hover:bg-white-200" 
                    onClick={displayTodoHandler}
    >
      <div className=" m-2">
        <input
          type="checkbox"
          className="w-4 h-4 rounded bg-white-400 accent-white-500 border-white-600"
        />
      </div>
      <div className="grow m-2 text-base text-ellipsis font-neue font-medium overflow-hidden whitespace-nowrap">
        <span>{singleTodo.title} </span>
      </div>
      <div className="transition-all duration-200 ease-in-out flex-none m-2 w-fit h-fit  cursor-pointer hover:scale-110 "
          onClick={(e) => starTodoHandler(e)}
          >
        <StarRoundedIcon sx={{ color: `${isStarred ? "#b08f26" : "#292524"}`, fontSize: 20 }} />
      </div>
      <div className="transition-all duration-200 ease-in-out flex-none m-2 w-fit h-fit  cursor-pointer hover:scale-110 "
            onClick={(e) => repeatTodoHandler(e)}>
        <LoopRoundedIcon sx={{ color: `${repeat ? "#008000" : "#292524"}`, fontSize: 20 }} />
      </div>
      <div className="transition-all duration-200 ease-in-out flex-none m-2 w-fit h-fit  cursor-pointer hover:scale-110 "
           onClick={(e) => deleteTodoHandler(e)}      
      >
        <DeleteIcon sx={{ color: "#AA4A44", fontSize: 20 }} />
      </div>
    </div>
  );
}
