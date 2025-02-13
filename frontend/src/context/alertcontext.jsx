import { createContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({children}) => {
    const [ isAlert, setIsAlert ] = useState(false);
    const [ alertMessage, setAlertMessage ] = useState(null);
    const [ severity, setSeverity ] = useState(null);

    const value = {
        isAlert,
        setIsAlert,
        alertMessage,
        setAlertMessage,
        severity,
        setSeverity
    };

    return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
};

export {AlertContext, AlertProvider};