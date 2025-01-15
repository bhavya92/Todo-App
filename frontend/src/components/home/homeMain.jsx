import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarcontext';


export default function HomeMain() {
    
    const {setSidebarVisibility, toggleButtonVisibility, setToggleButtonVisibilty } = useContext(SidebarContext);

    function toggleSidebar(){
        setSidebarVisibility("block");
        setToggleButtonVisibilty("hidden")
    }

    return <>
    <div className="w-full bg-stone-200 flex">
                    <div  className={`${toggleButtonVisibility} w-fit h-fit p-4 bg-stone-500 m-4`} onClick={toggleSidebar}>
                        <MenuRoundedIcon/>
                    </div>
                <h1>Welcome</h1>
            </div>
    </>
}