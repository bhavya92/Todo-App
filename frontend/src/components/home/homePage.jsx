import { logout } from "../../services/auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authcontext";
import { SidebarProvider } from "../../context/sidebarcontext";

import SideBar from "./Sidebar";
import HomeMain from "./homeMain";
import { TopicContext, TopicProvider } from "../../context/topicsContext";
import { TodoContext } from "../../context/todoContext";
import { ListContext } from "../../context/listsContext";
import { DetailSidebarProvider } from "../../context/detailBar";
import { fetchTopics } from "../../services/topic";
import { fetchLists } from "../../services/todoList";
import { fetchTodos } from "../../services/todo";
import { LoadingContext } from "../../context/loadingContext";

export default function UserHome() {
  const { setIsUser } = useContext(AuthContext);
  const { topic, setTopic } = useContext(TopicContext);
  const { setTodo } = useContext(TodoContext);
  const { todoList, setTodoList } = useContext(ListContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    //fetch all user data here
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
      } else {
        console.log("Response Code k hisab se error");
      }
      let response;
      if (Array.isArray(topicData.topics) && topicData.topics.length > 0) {
        console.log("Fetching lists");
        topicData.topics.forEach(async (element) => {
          response = await fetchLists(element._id);
          if (response.status === "200") {
            console.log("LIST FETCHED " + response.todoList);
            setTodoList((prevLists) => {
              const safePrevLists = Array.isArray(prevLists) ? prevLists : [];
              return [
                ...safePrevLists,
                { id: element._id, data: [...response.todoLists] },
              ];
            });

            if (
              Array.isArray(response.todoLists) &&
              response.todoLists.length > 0
            ) {
              response.todoLists.forEach(async (element) => {
                const responseTodo = await fetchTodos(element._id);
                if (responseTodo.status === "200") {
                  setTodo((prevTodos) => {
                    const safePrevTodos = Array.isArray(prevTodos)
                      ? prevTodos
                      : [];
                    return [
                      ...safePrevTodos,
                      { id: element._id, data: [...responseTodo.todos] },
                    ];
                  });
                }
              });
            }
          } else {
            setTodoList((prevLists) => {
              const safePrevLists = Array.isArray(prevLists) ? prevLists : [];
              return [...safePrevLists, { id: element._id, data: [] }];
            });
          }
        });
      } else {
        setIsLoading((s) => !s);
        return;
      }

      setIsLoading((s) => !s);
    };
    fetchData();
  }, []);

  async function logOutHandler() {
    const response = await logout();
    if (response.error === "none") {
      setTopic(null);
      setTodo(null);
      setTodoList(null);
      setIsUser(false);
    } else {
      console.log("Error logging out");
    }
  }

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen">
          <button
            className="absolute top-4 right-4 w-fit h-fit bg-white-100"
            onClick={logOutHandler}
          >
            Log out
          </button>
          <DetailSidebarProvider>
            <SideBar />
            <HomeMain />
          </DetailSidebarProvider>
        </div>
      </SidebarProvider>
    </>
  );
}
