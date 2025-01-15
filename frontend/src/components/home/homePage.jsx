import { logout } from "../../services/auth"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authcontext";

import SideBar from "./Sidebar";
import { SidebarContext } from "../../context/sidebarcontext";
import HomeMain from "./homeMain";

export default function UserHome(){
    const { setIsUser } = useContext(AuthContext);

    const [ isSidebarVisible, setIsSidebarVisible ] = useState(); 

    const [toggleButtonVisibility, setToggleButtonVisibilty] = useState(true);

    

    async function logOutHandler () {
        const response = await logout();
        if(response.error === 'none') {
            setIsUser(false);
        } else {
            console.log("Error logging out");
        }
    }

    return<>
    <SidebarContext.Provider value={{

        toggleButtonVisibility:toggleButtonVisibility,
        setToggleButtonVisibilty:setToggleButtonVisibilty,
        isSidebarVisible : isSidebarVisible,
        setIsSidebarVisible : setIsSidebarVisible
      }}>
        <div className="flex h-screen">
            <button className="absolute top-4 right-4 w-fit h-fit bg-stone-100" onClick={logOutHandler}>Log out</button>
            <SideBar/>
            <HomeMain>
                
            </HomeMain>
        </div>
      </SidebarContext.Provider>
   
    </>
}