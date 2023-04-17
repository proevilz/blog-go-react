import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AuthRedirect = () => {
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (
            window.location.pathname === '/auth' ||
            window.location.pathname === '/auth/' ||
            user
        ) {
            window.location.href = '/'
        }
    }, [])

    return <Outlet />
}

export default AuthRedirect
