import { useEffect, useState } from "react"
import Header from "./header"
import LoginPage from "../authentication/login";
import SignupPage from "../authentication/newHere";
export default function LandingPage() {
    
    const [ showLogin, setShowLogin ] = useState(false);
    const [ showSignup, setShowSignup ] = useState(false);

    const pointerEvent = (showLogin || showSignup) ? "pointer-events-none" : "pointer-events-auto"
    const blur =  (showLogin || showSignup) ? "blur-sm" : "blur-none"
    return <div className="relative w-screen h-screen flex justify-center items-center">
        {showLogin && <LoginPage closeLogin={() => setShowLogin(false)}/>}
        {showSignup && <SignupPage closeSignup={() => setShowSignup(false)}/>}     
        <div className={`absolute w-screen h-screen bg-stone-50 top-0 left-0 ${pointerEvent} ${blur}`}>
            <Header onLoginClick={()=>setShowLogin(true)}  
                    onSignupClick={() => {setShowSignup(true) }}/>
            <div className="bg-stone-50 flex justify-center">
                    <span className="p-2 h-fit w-fit mt-60 text-6xl">A simple Website to <b>Organize</b> Stuff.</span>
            </div>
        </div>
    </div>
    
}