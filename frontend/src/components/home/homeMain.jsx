import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarcontext';


export default function HomeMain() {
    
    const {setIsSidebarVisible, toggleButtonVisibility, setToggleButtonVisibilty } = useContext(SidebarContext);

    function toggleSidebar(){
        setIsSidebarVisible(true);
        setToggleButtonVisibilty(false)
    }

    return <>
    <div className="w-full bg-stone-200 flex">
                    <div  className={`${toggleButtonVisibility ? 'opacity-100 visible' : 'opacity-0 invisible'} 
                                    transition-opcaity duration-500 ease-in-out w-fit h-fit m-4 cursor-pointer  
                                    hover:bg-stone-500 rounded`} 
                                    onClick={toggleSidebar} >
                        <MenuRoundedIcon sx={{ color: '#292524', fontSize: 30 }} />
                    </div>
                <h1>Welcome</h1>
            </div>
    </>
}