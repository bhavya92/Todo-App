import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useContext } from 'react';
import TodoList from '../todo/todoList';
import { SidebarContext } from '../../context/sidebarcontext';
export default function HomeMain() {
    
    const {setIsSidebarVisible, toggleButtonVisibility, setToggleButtonVisibilty } = useContext(SidebarContext);


    function toggleSidebar(){
        setIsSidebarVisible(true);
        setToggleButtonVisibilty(false)
    }

   
    return <>
        <div className="w-7/12 h-full bg-stone-200 flex flex-col">
            <div  className={`${toggleButtonVisibility ? 'opacity-100 visible' : 'opacity-0 invisible'} 
                                        transition-opcaity duration-500 ease-in-out w-fit h-fit m-4 cursor-pointer  
                                        hover:bg-stone-500 rounded`} 
                                        onClick={toggleSidebar} >
                <MenuRoundedIcon sx={{ color: '#292524', fontSize: 30 }} />
            </div>
            <div className='m-4 grid grid-cols-1 lm:grid-cols-1  md:grid-cols-2 gap-x-9 gap-y-4 overflow-y-auto
                             scrollbar-thin scrollbar-thumb-stone-600 
                            scrollbar-track-stone-200'>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
            </div>
        </div>
    </>
}