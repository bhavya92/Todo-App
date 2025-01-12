import { useState } from "react"
import Header from "./header"
import LoginPage from "../authentication/login";
import SignupPage from "../authentication/newHere";
export default function LandingPage() {

    const [ showLogin, setShowLogin ] = useState(false);
    const [ showSignup, setShowSignup ] = useState(false);

    let pointerEvent = 'pointer-events-auto';
    if(showLogin || showSignup){
        pointerEvent = 'pointer-events-none';
    } else {
        pointerEvent = 'pointer-events-auto';
    }
    return <div className="relative flex justify-center items-center">
        {showLogin && <LoginPage closeLogin={() => setShowLogin(false)}/>}
        {showSignup && <SignupPage closeSignup={() => setShowSignup(false)}/>}     
        <div className={`absolute w-screen h-screen bg-mercury-50 top-0 left-0 ${pointerEvent}`}>
            <Header onLoginClick={() => {setShowLogin(true)
                                        setShowSignup(false)}}  
                    onSignupClick={() => {setShowSignup(true) 
                                            setShowLogin(false)}}/>
            <div className="bg-mercury-50 flex justify-center">
                    <span className="p-2 h-fit w-fit mt-60 text-6xl">A simple Website to <b>Organize</b> Stuff.</span>
            </div>
        </div>
    </div>
    
}