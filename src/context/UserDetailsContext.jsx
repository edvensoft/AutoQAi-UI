import React, { createContext, useContext, useState } from "react";

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");

  return (
    <UserDetailsContext.Provider value={{ fullName, setFullName }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("useUserDetails must be used within a UserDetailsProvider");
  }
  return context;
};
