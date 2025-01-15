import { useContext} from "react"
import { SidebarContext } from "../../context/sidebarcontext";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export default function SideBar() {
    const { sidebarVisibility, setSidebarVisibility,setToggleButtonVisibilty  } = useContext(SidebarContext);

    function closeSidebar(){
       setSidebarVisibility("hidden");
       setToggleButtonVisibilty("inline");
    }

    return <>
        <div className={`w-56 bg-stone-400 ${sidebarVisibility} lm:block)`}>
            <div className="flex flex-row-reverse m-2 h-fit" onClick={closeSidebar}>
                <CloseRoundedIcon/>
            </div>
            <div className=" grid grid-cols-1 grid-rows-7 gap-3 pl-4 pt-8">
                <span>
                    Home
                </span>
                <span>
                    Daily
                </span>
                <span>
                    Starred
                </span>
                <span>
                    Calendar
                </span>
                <span>
                    Reminders
                </span>
                <span>
                    Topics
                </span>
                <span>
                    My Lists
                </span>
            </div>
        </div>
        
    </>
}