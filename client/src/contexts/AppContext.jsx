import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [authStatus, setAuthStatus] = useState("user");

  const toggleDialog = () => {
    setIsDialogOpen((prevState) => !prevState);
  };

  const setUserStatus = (status) => {
    setAuthStatus(status);
  };

  return (
    <AppContext.Provider
      value={{ isDialogOpen, toggleDialog, authStatus, setUserStatus }}
    >
      {children}
    </AppContext.Provider>
  );
};
