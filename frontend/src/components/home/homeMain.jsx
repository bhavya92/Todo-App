import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import { useContext, useEffect, useRef, useState } from "react";
import TodoList from "../todo/todoList";
import { SidebarContext } from "../../context/sidebarcontext";
import { DetailSidebarContext } from "../../context/detailBar";
import DetailedTopicView from "../topic/detailedTopicView";
import { TopicContext } from "../../context/topicsContext";

import { fetchTopics } from "../../services/topic";
import { fetchLists, newList } from "../../services/todoList";
import { ListContext } from "../../context/listsContext";
import { fetchTodos } from "../../services/todo";
import { TodoContext } from "../../context/todoContext";

export default function HomeMain() {
  const { topic, setTopic, topicToFetch, setTopicToFetch } =
    useContext(TopicContext);
  const { todoList, setTodoList } = useContext(ListContext);
  const { todo, setTodo } = useContext(TodoContext);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [showInputBox, setShowInpuBox] = useState(false);
  const newListTitleRef = useRef(null);

  function toggleInputBox() {
    setShowInpuBox((s) => !s);
  }

  useEffect(() => {
    console.log("Inside useEffect of HomeMain Component");
    const fetchData = async () => {
      //TODO : FETCH ALL DATA AND TILL THEN SHOW SEXY LOADER
      //fetch all topic names
      // fetch lists of Perosnal topic
      const topicData = await fetchTopics();
      if (topicData.status === "200") {
        //set topics to context variable
        console.log("fetchTopic status 200");
        console.log(topicData.topics);
        setTopic(topicData.topics);
        setSkeletonLoader(false);
        // // fetch lists of all topics
        // // fetch todos of all topics

        // //Fetch Lists
        // console.log('------------------------------------------------------------------------------------------------------');
        // console.log(topic);
        // console.log('------------------------------------------------------------------------------------------------------');
        // try {
        //   topicData.topics.forEach(element => {

        //     console.log(element._id);
        //   });

        // } catch(err){
        //   console.log(err);
        // }
      } else {
        console.log("Response Code k hisab se error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTodoList([]);
    setSkeletonLoader(true);
    console.log("Topic to Fetch");
    console.log(topicToFetch);
    if(topicToFetch === null) {
      return;
    }
    // call fetchLists
    async function fetchThatListBruh() {
      console.log("Fetch that List Bruh called");
      try {
        console.log("Inside Try");
        const response = await fetchLists(topicToFetch);
        if (response.status === "200") {
          setTodoList(response.todoLists);
          //Fetch todos of those lists
          console.log("Logging Todo Lists FOund");
          console.log(response.todoLists);
          console.log("FETCHING TODOS OF EACH LIST FOUND");
          response.todoLists.forEach(async (element) => {
            console.log(element);
            console.log(element.title);
            const todoRes = await fetchTodos(element._id);
            if (todoRes.status === "200") {
              console.log('Todos FETCHED LOGGING')
              console.log(todoRes.todos);
              setTodo( (prev) => ( { ...prev, [element._id] : todoRes.todos })  );
              setSkeletonLoader(false);
            } else {
              console.log("Error fetching Todo");
              console.log(todoRes);
            }
          });
        } else if (response.status === "404") {
          setSkeletonLoader(false);
        } else {
          console.log("Error fetching Lists");
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchThatListBruh();
  }, [topicToFetch, setTopicToFetch]);
  
  //due to batch rendering
  useEffect(() => {
    console.log("todoList updated:", todoList);
  }, [todoList]);
  
  async function newListHandler() {
    if(newListTitleRef.current.value === '') {
      newListTitleRef.current.focus();
      newListTitleRef.current.placeholder = 'No Title Provided';
      return;
    }
    const response = await newList(topicToFetch, newListTitleRef.current.value);
    if (response.status === "200") {
      console.log('Success Creating a List')
      setTodoList( (prevTodoList) => {
        const safePrevTodoList = Array.isArray(prevTodoList) ? prevTodoList : [];
        const updatedList = [...safePrevTodoList, response.newList  ];
        return updatedList;
      });

      setTodo( (prevTodos) => {
        const updatedTodos = {...prevTodos};
        updatedTodos[response.newList._id] = [];
        return updatedTodos;
      });
      console.log('Updated todoList');
      console.log(todoList);

    } else {
      console.log('Error Creating a List');
      console.log(response);
    }
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
    <div className="overflow-x-hidden overflow-y-hidden flex flex-row w-screen h-screen">
      <div className="w-full h-full bg-white-200 flex flex-col">
        <div
          className={`${toggleButtonVisibility ? "opacity-100 visible" : "opacity-0 invisible"} 
                                        transition-opcaity duration-500 ease-in-out w-fit h-fit m-4 cursor-pointer  
                                        hover:bg-white-500 rounded`}
          onClick={toggleSidebar}
        >
          <MenuRoundedIcon sx={{ color: "#292524", fontSize: 30 }} />
        </div>
        {skeletonLoader ? (
          <div>LOADING...</div>
        ) : (
          <div className="relative h-full">
            <div className="flex flex-row absolute top-0 right-0 mr-8 items-center justify-center">
              <div
                className={`tarnsition-all duration-200 ease-in-outw-64 ${showInputBox ? "opacity-100" : "opacity-0"}`}
                style={{ visibility: showInputBox ? "visible" : "hidden" }}
              >
                <span
                  className="cursor-pointer w-fit h-fit"
                  onClick={newListHandler}
                >
                  <AddCircleRoundedIcon sx={{ color: "", fontSize: 30 }} />
                </span>
                <input
                  ref = {newListTitleRef}
                  type="text"
                  className={`h-full p-2 ml-2 mr-2 border bg-white-400 border-white-700 
                              focus:border-white-900 hover:border-white-900
                              focus:outline-none focus:ring-0 font-roboto font-light 
                              text-white-900 placeholder-white-700 text-md`}
                  placeholder="Add Title of List"
                />
              </div>
              <span
                className="cursor-pointer bg-white-400 rounded p-2"
                onClick={toggleInputBox}
              >
                Create List
              </span>
            </div>
            <div
              className="p-6 mt-10 h-full columns-2 gap-8  overflow-y-auto
                     scrollbar-thin scrollbar-thumb-white-600
                    scrollbar-track-white-200"
            >
              {Array.isArray(todoList) ? (
                 todoList.map((item,index) => (
                  <TodoList 
                    key={item._id} 
                    singleList={item} 
                    todosOfCurrentList={todo[item._id]} 
                    index={index} 
                  />
                ))
              ) : (
                <div>No List Found</div>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className={`transition-all duration-300 ease-in-out flex-none 
                    h-full bg-white-100 shadow-lg shadow-white-700 rounded-sm z-20 
                    ${isDetailVisible ? "w-[44rem]" : "w-[3rem]"}`}
      >
        <div className={`relative w-full h-full`}>
          <div
            className={`h-full transition-all  ease-in-out  
                        ${isDetailVisible ? "opacity-100  duration-700" : "opacity-0  duration-100"}  `}
          >
            <DetailedTopicView />
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
    </div>
  );
}
