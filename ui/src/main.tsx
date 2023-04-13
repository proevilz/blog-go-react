import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AuthRedirect from './components/AuthRedirect'
const queryClient = new QueryClient()
import './index.css'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
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
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
)
