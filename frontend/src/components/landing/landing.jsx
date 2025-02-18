import { useState,useContext } from "react";
import Header from "./header";
import LoginPage from "../authentication/login";
import SignupPage from "../authentication/newHere";
import { AuthContext } from "../../context/authcontext";
export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { setEmailSent, setOtpVerified, setEmailEntered } = useContext(AuthContext);

  const pointerEvent =
    showLogin || showSignup ? "pointer-events-none" : "pointer-events-auto";
  const blur = showLogin || showSignup ? "blur-sm" : "blur-none";

  function handleCloseSignup(){
    setShowSignup(false);
    setEmailSent(false);
    setOtpVerified(false);
    setEmailEntered(null);

  }
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      {showLogin && <LoginPage closeLogin={() => setShowLogin(false)} />}
      {showSignup && <SignupPage closeSignup={handleCloseSignup} />}
      <div
        className={`absolute w-screen h-screen bg-white-50 top-0 left-0 ${pointerEvent} ${blur}`}
      >
        <Header
          onLoginClick={() => setShowLogin(true)}
          onSignupClick={() => {
            setShowSignup(true);
          }}
        />
        <div className="bg-white-50 flex justify-center">
          <span
            className="p-2 h-fit w-fit mt-60 text-center text-4xl 
                                    md:text-6xl font-light font-bungee"
          >
            A simple Website to
            <span className="text-4xl md:text-7xl"> Organize </span>
            stuff.
          </span>
        </div>
      </div>
    </div>
  );
}
