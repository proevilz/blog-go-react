import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const AuthRedirect = () => {
    useEffect(() => {
        if (
            window.location.pathname === '/auth' ||
            window.location.pathname === '/auth/'
        ) {
            window.location.href = '/'
        }
    }, [])

    return <Outlet />
}

export default AuthRedirect
