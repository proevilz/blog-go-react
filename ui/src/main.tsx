import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AuthRedirect from './components/AuthRedirect'
const queryClient = new QueryClient()
import './index.css'
import AuthState from './context/AuthContext'
import Dashboard from './pages/dashboard/Dashboard'
import Write from './pages/dashboard/Write'
import Logout from './pages/auth/Logout'
import Post from './pages/Post'
import Settings from './pages/dashboard/settings/Settings'
import Customisation from './pages/dashboard/settings/Customisation'
import Notifications from './pages/dashboard/settings/Notifications'
import Account from './pages/dashboard/settings/Account'
import Billing from './pages/dashboard/settings/Billing'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        loader: () => <p>Loading...</p>,
    },
    {
        path: '/post/:slug',
        element: <Post />,
        loader: () => <p>Loading...</p>,
    },
    {
        path: '/auth',
        element: <AuthRedirect />,
        loader: () => <p>Loading...</p>,
        children: [
            {
                path: '/auth/login',
                element: <Login />,
                loader: () => <p>Loading...</p>,
            },
            {
                path: '/auth/register',
                element: <Register />,
                loader: () => <p>Loading...</p>,
            },
        ],
    },
    {
        path: '/logout',
        element: <Logout />,
        loader: () => <p>Loading...</p>,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        loader: () => <p>Loading...</p>,
    },
    {
        path: '/dashboard/write',
        element: <Write />,
        loader: () => <p>Loading...</p>,
    },
    {
        path: '/dashboard/settings',
        element: <Settings />,
        loader: () => <p>Loading...</p>,
        children: [
            {
                path: '/dashboard/settings/customisation',
                element: <Customisation />,
            },
            {
                path: '/dashboard/settings/notifications',
                element: <Notifications />,
            },
            {
                path: '/dashboard/settings/account',
                element: <Account />,
            },
            {
                path: '/dashboard/settings/billing',
                element: <Billing />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AuthState>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </AuthState>
)
