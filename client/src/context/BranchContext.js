import React, {useState, createContext} from "react"

export const BranchContext = createContext()

export const BranchContextProvider = props => {
  const [branches, setBranch] = useState([])

  const addBranch = (branch) => {
    setBranch([...branches, branch])
  }

  return (
    <BranchContext.Provider value={{branches, setBranch, addBranch}} >
      {props.children}
    </BranchContext.Provider >
  )
}