import { useLocalStorage } from '@mantine/hooks'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { checkTokenExpiration } from '../utils'

interface AuthContext {
    user: null | User
    setUser: React.Dispatch<React.SetStateAction<null | User>>
}
export const AuthContext = createContext<AuthContext>({} as AuthContext)

const AuthState = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const [user, setUser] = useLocalStorage<User | null>({
        key: 'user',
        defaultValue: null,
    })
    checkTokenExpiration()
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthState
