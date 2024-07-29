import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext();

export const EmployeeContextProvider = ({ children }) => {
  const [employees, setEmployee] = useState([]);

  const addEmployee = (employee) => {
    setEmployee([...employees, employee])
  }

  return (
    <EmployeeContext.Provider value={{ employees, setEmployee, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
