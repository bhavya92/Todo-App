import { createContext, useState } from "react";

const DetailSidebarContext = createContext();

const DetailSidebarProvider = ({ children }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const [toggleDetailButton, setToggleDetailButton] = useState(true);

  const [ detailBarContent, setDetailBarContent  ] = useState('topics');

  const value = {
    isDetailVisible,
    setIsDetailVisible,
    toggleDetailButton,
    setToggleDetailButton,
    detailBarContent,
    setDetailBarContent,
  };

  return (
    <DetailSidebarContext.Provider value={value}>
      {children}
    </DetailSidebarContext.Provider>
  );
};

export { DetailSidebarContext, DetailSidebarProvider };
