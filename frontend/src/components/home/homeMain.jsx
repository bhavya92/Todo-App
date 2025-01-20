import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";

import { useContext } from "react";
import TodoList from "../todo/todoList";
import { SidebarContext } from "../../context/sidebarcontext";
import { DetailSidebarContext } from "../../context/detailBar";
export default function HomeMain() {
  const {
    setIsSidebarVisible,
    toggleButtonVisibility,
    setToggleButtonVisibilty,
  } = useContext(SidebarContext);

  const {
    isDetailVisible,
    setIsDetailVisible,
    toggleDetailButton,
    setToggleDetailButton,
  } = useContext(DetailSidebarContext);

  function toggleSidebar() {
    setIsSidebarVisible(true);
    setToggleButtonVisibilty(false);
  }

  function toggleExpandedView() {
    setIsDetailVisible((s) => !s);
  }

  return (
    <div className="overflow-x-hidden overflow-y-hidden flex flex-row w-screen h-screen">
      <div className="w-full h-full bg-stone-200 flex flex-col">
        <div
          className={`${toggleButtonVisibility ? "opacity-100 visible" : "opacity-0 invisible"} 
                                        transition-opcaity duration-500 ease-in-out w-fit h-fit m-4 cursor-pointer  
                                        hover:bg-stone-500 rounded`}
          onClick={toggleSidebar}
        >
          <MenuRoundedIcon sx={{ color: "#292524", fontSize: 30 }} />
        </div>
        <div
          className="pl-4 pr-4 m-4 grid grid-cols-1 lm:grid-cols-1  md:grid-cols-2 gap-x-9 gap-y-4 overflow-y-auto
                             scrollbar-thin scrollbar-thumb-stone-600 
                            scrollbar-track-stone-200"
        >
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out flex-none h-full bg-stone-400 shadow-lg shadow-stone-700 rounded-sm z-20 ${isDetailVisible ? "w-[44rem]" : "w-[3rem]"}`}
      >
        <div className={`relative lex flex-col w-full h-full justify-between`}>
          <div
            className={`transition-all duration-500 ease-in-out ${isDetailVisible ? "opacity-100" : "opacity-0"}  `}
          >
            Main Content
          </div>
          <div
            className={`cursor-pointer absolute left-2 bottom-2 transition-transform ease-in-out duration-500 transform origin-center ${isDetailVisible ? "" : "rotate-180"}`}
            onClick={toggleExpandedView}
          >
            <ChevronRightSharpIcon sx={{ fontSize: 30 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
