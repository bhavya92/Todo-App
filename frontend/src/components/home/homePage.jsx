import { logout } from "../../services/auth"
import { useContext } from "react";
import { AuthContext } from "../../App";

export default function UserHome(){
    const { setIsUser } = useContext(AuthContext);

    async function logOutHandler () {
        const response = await logout();
        if(response.error === 'none') {
            setIsUser(false);
        } else {
            console.log("Error logging out");
        }
    }

    return<>
    <button onClick={logOutHandler}>Log out</button>
        <h1>Welcome</h1>
    </>
}