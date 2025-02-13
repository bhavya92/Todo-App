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

import SettingsIcon from '@mui/icons-material/Settings';
import { Settingbarcontext } from "../../context/settingbarcontext";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { AlertContext } from "../../context/alertcontext";
import TickLoader from "../ui/loader/mainPageLoader";

export default function UserHome() {
  const { setTopic } = useContext(TopicContext);
  const { setTodo } = useContext(TodoContext);
  const { setTodoList } = useContext(ListContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { isSettingbarVisible, setIsSettingBarVisible } = useContext(Settingbarcontext);
  const { isAlert, alertMessage, severity, setIsAlert, setAlertMessage, setSeverity } = useContext(AlertContext);

  useEffect(() => {
    //fetch all user data here
    const fetchData = async () => {
      //fetch all topic names
      // fetch lists of Perosnal topic
      const topicData = await fetchTopics();
      if (topicData.status === "200") {
        //set topics to context variable
        console.log("fetchTopic status 200");
        console.log(topicData.topics);
        setTopic(topicData.topics);
      } else {
        //TODO : SHOW ERROR SCREEN
        setSeverity("error");
        setAlertMessage("Something went wrong.");
        setIsAlert(true);
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
            } else {
              setSeverity("error");
              setAlertMessage("Something went wrong.");
              setIsAlert(true);
            }
          } else {
            setTodoList((prevLists) => {
              const safePrevLists = Array.isArray(prevLists) ? prevLists : [];
              return [...safePrevLists, { id: element._id, data: [] }];
            });
              setSeverity("error");
              setAlertMessage("Something went wrong.");
              setIsAlert(true);
          }
        });
      } else {
        setIsLoading(false);
        setIsLoading((s) => !s);
        return <>
          <div>ERRRRORRRR</div>
        </>;
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(isAlert === null || isAlert === false)
      return

    const timer = setTimeout( ()=> {
      setIsAlert(false);
    },2000)

    return  ()=> clearTimeout(timer);
  },[isAlert])

  function settingClickHandler() {
    //TODO : Add a click effect too.
    setIsSettingBarVisible( (prev) => !prev );
  }

  return (
    <>
      {isLoading ? <TickLoader/> : 
      <SidebarProvider>
        <div className="flex h-screen">
          <div className="tarnsition-all duration-200 ease-in-out absolute top-4 
                          right-3 w-fit h-fit z-50 cursor-pointer hover:scale-110"
              onClick={settingClickHandler}>
            <SettingsIcon sx= {{ color:`${isSettingbarVisible ? "#bdbdbd" : "#3d3d3d"} `,fontSize: "1.25rem" }}/>
          </div>
          <DetailSidebarProvider>
            <SideBar />
            <HomeMain />
          </DetailSidebarProvider>
          {isAlert ? 
            <div className="absolute bottom-2 left-2 z-10">
            <Stack sx={{ width:'300px'}} spacing={2}>
              <Alert severity={`${severity}`}>
                <AlertTitle>{severity}</AlertTitle>
                {alertMessage}
              </Alert>
            </Stack>
          </div> : <></>
          }
          
        </div>
      </SidebarProvider>
    }
    </>
  );
}
