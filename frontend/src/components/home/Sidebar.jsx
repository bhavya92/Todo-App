import { useContext} from "react"
import { SidebarContext } from "../../context/sidebarcontext";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import TopicRoundedIcon from '@mui/icons-material/TopicRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';

export default function SideBar() {
    const { setToggleButtonVisibilty, isSidebarVisible, setIsSidebarVisible  } = useContext(SidebarContext);

    function closeSidebar(){
        setIsSidebarVisible(false);
        setToggleButtonVisibilty("inline");
    }

    return <>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden bg-stone-400
                         ${isSidebarVisible ? 'w-56':'w-0'} 
                         ${isSidebarVisible ? 'w-56 opacity-100' : 'w-0 opacity-0'}
                         shadow-lg shadow-stone-700 rounded z-20 
                         `}>
            <div className="flex flex-row-reverse m-2 h-fit" onClick={closeSidebar}>
                <span className="transition-all duration-300 ease-in-out w-fit h-fit cursor-pointer hover:bg-stone-500 rounded">
                    <CloseRoundedIcon sx={{ color: '#292524', fontSize: 30 }}/>
                </span>
                
            </div>
            <div className="transition-all duration-300 ease-in-out grid grid-cols-1 grid-rows-7 gap-3 pl-4 pt-4">
                <div className="cursor-pointer flex items-center hover:bg-stone-500  p-1 rounded w-40">
                    <HomeRoundedIcon sx={{ color: '#292524', fontSize: 20 }}/>
                    <span className="text-stone-800 ml-2 text-light">
                        Home
                    </span>
                </div>
                <div className="cursor-pointer flex items-center hover:bg-stone-500 w-40 p-1 rounded">
                    <LoopRoundedIcon sx={{ color: '#292524', fontSize: 20 }}/>
                    <span className="text-stone-800 ml-2 text-light">
                        Daily
                    </span>
                </div>
                <div className="cursor-pointer flex items-center hover:bg-stone-500 w-40 p-1 rounded">
                    <StarRoundedIcon sx={{ color: '#292524', fontSize: 20 }}/>
                    <span className="text-stone-800 ml-2 text-light">
                        Starred
                    </span>
                </div>
                <div className="cursor-pointer flex items-center hover:bg-stone-500 w-40 p-1 rounded">
                    <CalendarMonthRoundedIcon sx={{ color: '#292524', fontSize: 20 }}/>
                    <span className="text-stone-800 ml-2 text-light">
                        Calendar
                    </span>
                </div>
                <div className="cursor-pointer flex items-center hover:bg-stone-500 w-40 p-1 rounded">
                    <NotificationsNoneRoundedIcon sx={{ color: '#292524', fontSize: 20 }}/>
                    <span className="text-stone-800 ml-2 text-light">
                        Reminders
                    </span>
                </div>
                <div className="cursor-pointer flex items-center hover:bg-stone-500 w-40 p-1 rounded">
                    <TopicRoundedIcon sx={{ color: '#292524', fontSize: 20 }}/>
                    <span className="text-stone-800 ml-2 text-light">
                        Topics
                    </span>
                </div>
                <div className="cursor-pointer flex items-center hover:bg-stone-500 w-40 p-1 rounded">
                    <ChecklistRoundedIcon sx={{ color: '#292524', fontSize: 20 }}/>
                    <span className="text-stone-800 ml-2 text-light">
                        My Lists
                    </span>                
                </div>
            </div>
        </div>
        
    </>
}