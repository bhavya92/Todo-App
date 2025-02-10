import { createContext, useState } from "react";
const Settingbarcontext = createContext();

const SettingbarProvider = ({ children }) => {
    const [ isSettingbarVisible, setIsSettingBarVisible ] = useState(false);

    const value = {
        isSettingbarVisible,
        setIsSettingBarVisible,
    };

    return (<Settingbarcontext.Provider value={value}>{children}</Settingbarcontext.Provider>);
};

export { Settingbarcontext, SettingbarProvider };