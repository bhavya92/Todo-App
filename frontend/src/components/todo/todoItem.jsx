import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useContext } from "react";
import { DetailSidebarContext } from "../../context/detailBar";
import { TodoContext } from "../../context/todoContext";

export default function TodoItem({ singleTodo }) {

  const { setDetailBarContent, setIsDetailVisible  } = useContext(DetailSidebarContext);
  const { setTodoInDetail  } = useContext(TodoContext);

  function displayTodoHandler() {
    setDetailBarContent('todo');
    setTodoInDetail(singleTodo);
    setIsDetailVisible(true);
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
      <div className="transition-all duration-200 ease-in-out flex-none m-2 w-fit h-fit  cursor-pointer hover:scale-110 ">
        <StarRoundedIcon sx={{ color: "#292524", fontSize: 20 }} />
      </div>
      <div className="transition-all duration-200 ease-in-out flex-none m-2 w-fit h-fit  cursor-pointer hover:scale-110 ">
        <LoopRoundedIcon sx={{ color: "#292524", fontSize: 20 }} />
      </div>
    </div>
  );
}
