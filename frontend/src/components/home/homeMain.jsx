import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import { useContext, useEffect, useRef, useState } from "react";
import TodoList from "../todo/todoList";
import { SidebarContext } from "../../context/sidebarcontext";
import { DetailSidebarContext } from "../../context/detailBar";
import DetailedTopicView from "../topic/detailedTopicView";
import { TopicContext } from "../../context/topicsContext";

import { ListContext } from "../../context/listsContext";

import { TodoContext } from "../../context/todoContext";
import { newList } from "../../services/todoList";
import DetailedTodoView from "../todo/detailedTodoView";
import SettingBar from "./settingbar";
import { Settingbarcontext } from "../../context/settingbarcontext";
import { AlertContext } from "../../context/alertcontext";

export default function HomeMain() {
  const { topicToFetch, setTopicToFetch,topic, setTopic } = useContext(TopicContext);
  const { todoList, setTodoList } = useContext(ListContext);
  const { todo, setTodo } = useContext(TodoContext);
  const { detailBarContent } = useContext(DetailSidebarContext);
  const { isSettingbarVisible } = useContext(Settingbarcontext);
  const { setIsAlert, setAlertMessage, setSeverity } = useContext(AlertContext);

  const [showInputBox, setShowInpuBox] = useState(false);
  const newListTitleRef = useRef(null);
  function toggleInputBox() {
    setShowInpuBox((s) => !s);
  }
  const pointerEvent = isSettingbarVisible ? "pointer-events-none" : "pointer-events-auto";
  const blur = isSettingbarVisible ? "blur-sm" : "blur-none";

  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  console.log(todoList);

  // useEffect(() => { 
  //   console.log("AB KYA HOGYA");
  //   console.log(topicToFetch);
  // }, [topicToFetch, setTopicToFetch]);
  
  // useEffect(() => {
  //   console.log("Updated topic:", topic);
  // }, [topic]);
  
  //due to batch rendering
  useEffect(() => {
    console.log("todoList updated:", todoList);
  }, [todoList, todo]);

  async function newListHandler() {
    if (newListTitleRef.current.value === "") {
      newListTitleRef.current.focus();
      newListTitleRef.current.placeholder = "No Title Provided";
      return;
    }
    const response = await newList(topicToFetch, newListTitleRef.current.value);
    if (response.status === "200") {
      console.log("Success Creating a List");
      console.log(topicToFetch);
      setTodoList((prevTodoList) => {
        console.log(prevTodoList);
        const safePrevTodoList = Array.isArray(prevTodoList)
          ? prevTodoList
          : [];

        const updatedList = safePrevTodoList.map((item) => {
          if (item.id === topicToFetch) {
            return {
              ...item,
              data: [...item.data, response.newList],
            };
          }
          return item;
        });

        return updatedList;
      });

      setTodo((prevTodos) => {
        const safePrevTodos = Array.isArray(prevTodos) ? prevTodos : [];

        return [...safePrevTodos, { id: response.newList._id, data: [] }];
      });
      console.log("Updated todoList");
      console.log(todoList);

      setTopic( (prevTopic) => {
        const safePrevTopic =  Array.isArray(prevTopic) ? prevTopic : [];
        const updatedTopic = safePrevTopic.map(item =>
          item._id === topicToFetch ? { ...item, listCount: item.listCount + 1 } : item
      );
        return updatedTopic;
      })

    } else {
      setSeverity("error");
      setAlertMessage("Somethinng went wrong.");
      setIsAlert(true);
      console.log(response);
    }
    setShowInpuBox(false);
    newListTitleRef.current.value= "";
  }

  const {
    setIsSidebarVisible,
    toggleButtonVisibility,
    setToggleButtonVisibilty,
  } = useContext(SidebarContext);

  const { isDetailVisible, setIsDetailVisible } =
    useContext(DetailSidebarContext);

  function toggleSidebar() {
    setIsSidebarVisible(true);
    setToggleButtonVisibilty(false);
  }

  function toggleExpandedView() {
    setIsDetailVisible((s) => !s);
  }

  return (
    <div className={`overflow-x-hidden overflow-y-hidden flex flex-row w-screen h-screen`}>
      <div className={`w-full h-full bg-white-200 flex flex-col ${pointerEvent} ${blur}`}>
        <div
          className={`${toggleButtonVisibility ? "opacity-100 visible" : "opacity-0 invisible"} 
                                        transition-opcaity duration-500 ease-in-out w-fit h-fit m-4 cursor-pointer  
                                        hover:bg-white-500 rounded`}
          onClick={toggleSidebar}
        >
          <MenuRoundedIcon sx={{ color: "#292524", fontSize: 30 }} />
        </div>
        <div className="relative h-full">
          {topicToFetch !== null ? <div className="ml-10 mt-4 font-roboto font-light text-2xl text-white-700">
                {topic.find((item) => item._id === topicToFetch)?.title}
              </div> : <></>
          }
          {topicToFetch !== null ? (
            
            <div
              className="p-6 mt-2 h-full columns-2 gap-8  overflow-y-auto
                     scrollbar-thin scrollbar-thumb-white-600
                    scrollbar-track-white-200"
              key={new Date()}
            >
              <div className="flex flex-row absolute top-0 right-0 mr-8 items-center justify-center">
                <div
                  className={`w-fit h-fit tarnsition-all duration-200 ease-in-out flex ${showInputBox ? "opacity-100" : "opacity-0"}`}
                  style={{ visibility: showInputBox ? "visible" : "hidden" }}
                >
                  <span
                    className="cursor-pointer bg-white-400 rounded p-2 w-fit h-fit"
                    onClick={newListHandler}
                  >
                    Create List
                  </span>
                  <input
                    ref={newListTitleRef}
                    type="text"
                    className={`h-full w-80 p-2 ml-2 mr-2 border bg-white-400 border-white-700 
                              focus:border-white-900 hover:border-white-900
                              focus:outline-none focus:ring-0 font-roboto font-light 
                              text-white-900 placeholder-white-700 text-md`}
                    placeholder="Add Title of List"
                  />
                </div>
                <span
                  className="cursor-pointer w-fit h-fit"
                  onClick={toggleInputBox}
                >
                  <AddCircleRoundedIcon sx={{ color: "", fontSize: 30 }} />
                </span>
              </div>
              {todoList.map((item) => {
                item.id === topicToFetch && console.log("MUSTARRRRD",item)
                return item.id === topicToFetch ? (
                  Array.isArray(item.data) && item.data.length > 0 ? (
                    item.data.map((SubItem, index) => (
                      <TodoList
                        key={SubItem._id}
                        singleList={SubItem}
                        todosOfCurrentList={todo.filter(
                          (item) => item.id === SubItem._id
                        )}
                        index={index}
                      />
                    ))
                  ) : (
                    <div key={item._id}>No List Found</div>
                  )
                ) : null }
              )}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-3xl">
              HOMEEE
            </div>
          )}
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out flex-none 
                    h-full bg-white-100 shadow-lg shadow-white-700 rounded-sm z-20 
                    ${isDetailVisible ? "w-[44rem]" : "w-[3rem]"} ${pointerEvent} ${blur}`}
      >
        <div className={`relative w-full h-full`}>
          <div
            className={`h-full transition-all  ease-in-out  
                        ${isDetailVisible ? "opacity-100  duration-700" : "opacity-0  duration-100"}  `}
          >
            {detailBarContent === "topics" ? (
              <DetailedTopicView />
            ) : (
              <DetailedTodoView />
            )}
          </div>

          <div
            className={`cursor-pointer absolute left-2 bottom-2 
                        transition-transform ease-in-out duration-500 
                        transform origin-center ${isDetailVisible ? "" : "rotate-180"}`}
            onClick={toggleExpandedView}
          >
            <ChevronRightSharpIcon sx={{ fontSize: 30 }} />
          </div>
        </div>
      </div>
      {isSettingbarVisible ? <SettingBar /> : <></>}
    </div>
  );
}
