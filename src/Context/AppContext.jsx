import React, { createContext, useContext, useState } from "react";

const userContext = createContext();

const AppContext = ({ children }) => {
  const [IsAuthorized, setIsAuthorized] = useState(true);
  const [User, setUser] = useState({
    Name: "Prajwal Neupane",
    UID: "prajwal7675",
  });
  const [IsCreator, setIsCreator] = useState(true);
  const [IsChats, setIsChats] = useState(false);
  const [IsRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <userContext.Provider
      value={{
        IsAuthorized,
        setIsAuthorized,
        User,
        setUser,
        IsCreator,
        setIsCreator,
        IsChats,
        setIsChats,
        IsRequestOpen,
        setIsRequestOpen,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default AppContext;

export const useData = () => {
  return useContext(userContext);
};
