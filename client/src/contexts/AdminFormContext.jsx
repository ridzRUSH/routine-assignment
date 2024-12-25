import React, { createContext, useState, useContext } from "react";

const AdminFormContext = createContext();

export const useAdminFormContext = () => {
  return useContext(AdminFormContext);
};

export const AdminFormContextProvider = ({ children }) => {
  const [routineId, setRoutineId] = useState(null);
  return (
    <AdminFormContext.Provider
      value={{
        routineId,
        setRoutineId,
      }}
    >
      {children}
    </AdminFormContext.Provider>
  );
};
