import { TopicContext } from "../../context/topicsContext";
import { AuthContext } from "../../context/authcontext";
import { TodoContext } from "../../context/todoContext";
import { ListContext } from "../../context/listsContext";
import { useContext } from "react";
import { Settingbarcontext } from "../../context/settingbarcontext";

export default function SettingBar(){

    const { setTopic } = useContext(TopicContext);
    const { setIsUser } = useContext(AuthContext);
    const { setTodo } = useContext(TodoContext);
    const { setTodoList } = useContext(ListContext);
    const { isSettingbarVisible } = useContext(Settingbarcontext);

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

    return <div className={`absolute top-0 right-0 pr-20 pl-4 py-10 h-full bg-white-700
                            shadow-lg shadow-white-700 rounded-sm z-20
                            transition-all duration-300 ease-in-out 
                            ${isSettingbarVisible ? "w-fit opacity-100" : "w-0 opacity-0" }`}
            >
        <button
            className="p-2 w-fit h-fit bg-white-100"
            onClick={logOutHandler}
          >
            Log out
          </button>
    </div>
}