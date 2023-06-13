import { createContext, useState } from 'react'

export const AuthContext = createContext({ userId: null, updateUserId: () => {} })

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null)

  const updateUserId = userId => {
    setUserId(userId)
  }

  return <AuthContext.Provider value={{ userId, updateUserId }}>{children}</AuthContext.Provider>
}
