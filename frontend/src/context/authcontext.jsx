import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(null);
  const [valiadtionDone, setValidationDone] = useState(false);

  const value = {
    isUser,
    setIsUser,
    valiadtionDone,
    setValidationDone,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
