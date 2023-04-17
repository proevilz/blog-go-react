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
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AuthState>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </AuthState>
)
