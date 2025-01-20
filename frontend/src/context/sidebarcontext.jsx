import { createContext, useState } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState();

  const [toggleButtonVisibility, setToggleButtonVisibilty] = useState(true);

  const [showTopicDropdown, setShowTopicDropdown] = useState(false);

  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);

  const value = {
    isSidebarVisible,
    setIsSidebarVisible,

    toggleButtonVisibility,
    setToggleButtonVisibilty,

    showTopicDropdown,
    setShowTopicDropdown,

    showPersonalDropdown,
    setShowPersonalDropdown,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
