import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useContext, useEffect,useState } from "react";
import { DetailSidebarContext } from "../../context/detailBar";
import { TodoContext } from "../../context/todoContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTodo } from "../../services/todo";

export default function TodoItem({ singleTodo }) {

  const { setDetailBarContent, setIsDetailVisible  } = useContext(DetailSidebarContext);
  const { setTodoInDetail,todo,setTodo  } = useContext(TodoContext);
  const [isStarred, setIsStarred] = useState(null);
  const [ repeat, setRepeat ] = useState(null);
  
  useEffect( ()=>{
    setIsStarred(singleTodo.starred);
    setRepeat(singleTodo.daily);
  },[])

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
      //show alert
      //update todo array
      //let newTodos = todo.map( (item) => {item} )
      let newTodo = todo.map((list) => ({
        ...list,
        data : list.data.filter( (item) => 
            item._id !== singleTodo._id)
      }));
      console.log(newTodo)
      setTodo(newTodo);
    } else {
      setSeverity("error");
      setAlertMessage("Error deleting todo.");
      setIsAlert(true);
    }
  }

  function starTodoHandler(){

  }

  function repeatTodoHandler(){

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
          >
        <StarRoundedIcon sx={{ color: `${isStarred ? "#b08f26" : "#292524"}`, fontSize: 20 }} />
      </div>
      <div className="transition-all duration-200 ease-in-out flex-none m-2 w-fit h-fit  cursor-pointer hover:scale-110 ">
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
