import { logout } from "../../services/auth"
import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import SideBar from "./Sidebar";
import { SidebarContext } from "../../context/sidebarcontext";
import HomeMain from "./homeMain";

export default function UserHome(){
    const { setIsUser } = useContext(AuthContext);
    const [ sidebarVisibility, setSidebarVisibility  ] = useState("hidden");
    const [toggleButtonVisibility, setToggleButtonVisibilty] = useState("block");

    

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
        sidebarVisibility:sidebarVisibility,
        setSidebarVisibility:setSidebarVisibility,
        toggleButtonVisibility:toggleButtonVisibility,
        setToggleButtonVisibilty:setToggleButtonVisibilty
      }}>
        <div className="flex h-screen">
            <button className="absolute top-4 right-4 w-fit h-fit bg-stone-100" onClick={logOutHandler}>Log out</button>
            <SideBar/>
            <HomeMain/>
        </div>
      </SidebarContext.Provider>
   
    </>
}