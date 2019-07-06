import React from 'react'
import { useLocalStore } from 'mobx-react-lite';

const storeContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const localStore = useLocalStore(() => ({
    count: 0,
    incCount() {
      localStore.count++
    }
  }))
  return <storeContext.Provider value={localStore}>{children}</storeContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  return store
}
