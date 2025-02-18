import { TopicContext } from "../../context/topicsContext";
import { AuthContext } from "../../context/authcontext";
import { TodoContext } from "../../context/todoContext";
import { ListContext } from "../../context/listsContext";
import { useContext } from "react";
import { Settingbarcontext } from "../../context/settingbarcontext";
import { logout } from "../../services/auth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SettingBar(){

    const { setTopic } = useContext(TopicContext);
    const { setIsUser, user,setOtpVerified, setEmailEntered, setEmailSent  } = useContext(AuthContext);
    const { setTodo } = useContext(TodoContext);
    const { setTodoList } = useContext(ListContext);
    const { isSettingbarVisible } = useContext(Settingbarcontext);
    
    console.log(`ls bruh ${user.lastName}`);
    let userName = user.firstName + " " + user.lastName;
    async function logOutHandler() {
        const response = await logout();
        if (response.error === "none") {
          setTopic(null);
          setTodo(null);
          setTodoList(null);
          setIsUser(false);
          setOtpVerified(false);
          setEmailSent(false);
          setEmailEntered(null);
        } else {
          console.log("Error logging out");
        }
      }

    return <div className={`absolute top-0 right-0 pr-20 pl-4 py-4 h-full bg-white-700
                            shadow-lg shadow-white-700 rounded-sm z-20
                            transition-all duration-300 ease-in-out 
                            ${isSettingbarVisible ? "w-fit opacity-100" : "w-0 opacity-0"}`}
            > 
              <div className="px-2 w-full h-full flex flex-col gap-2">
                <div className="flex items-center w-full h-fit text-white-300 
                                font-roboto text-xl tracking-wide truncate">
                  {userName}
                </div>
                <div
                  className="w-fit h-fit cursor-pointer text-white-300 font-roboto 
                            text-base tracking-wide mt-10 hover:text-red"
                  onClick={logOutHandler}
                >
                Log out
                </div>
              </div>
              
    </div>
}