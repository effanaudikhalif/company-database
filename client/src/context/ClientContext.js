import React, { createContext, useState } from 'react';

export const ClientContext = createContext();

export const ClientContextProvider = ({ children }) => {
  const [clients, setClient] = useState([]);

  const addClient = (client) => {
    setClient([...clients, client])
  }

  return (
    <ClientContext.Provider value={{ clients, setClient, addClient }}>
      {children}
    </ClientContext.Provider>
  );
};
