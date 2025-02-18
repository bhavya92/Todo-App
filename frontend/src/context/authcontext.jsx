import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(null);
  const [valiadtionDone, setValidationDone] = useState(false);
  const [ user, setUser ] = useState({});
  const [ otpVerified, setOtpVerified ] = useState(false);
  const [ emailSent, setEmailSent ] = useState(false);
  const [emailEntered, setEmailEntered] = useState(null);
  const value = {
    isUser,
    setIsUser,
    valiadtionDone,
    setValidationDone,
    user,
    setUser,
    otpVerified,
    setOtpVerified,
    emailSent,
    setEmailSent,
    emailEntered,
    setEmailEntered,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
