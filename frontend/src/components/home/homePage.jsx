import { logout } from "../../services/auth";
import { useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import { SidebarProvider } from "../../context/sidebarcontext";

import SideBar from "./Sidebar";
import HomeMain from "./homeMain";
import { TopicContext } from "../../context/topicsContext";
import { TodoContext } from "../../context/todoContext";
import { ListContext } from "../../context/listsContext";
import { DetailSidebarProvider } from "../../context/detailBar";

export default function UserHome() {
  const { setIsUser } = useContext(AuthContext);
  const { setTopic } = useContext(TopicContext);
  const { setTodo } = useContext(TodoContext);
  const { setTodoList } = useContext(ListContext);

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
            className="absolute top-4 right-4 w-fit h-fit bg-stone-100"
            onClick={logOutHandler}
          >
            Log out
          </button>
          <SideBar />
          <DetailSidebarProvider>
            <HomeMain />
          </DetailSidebarProvider>
        </div>
      </SidebarProvider>
    </>
  );
}
