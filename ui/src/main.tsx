import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Root from './pages/Root'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        loader: () => <p>Loading...</p>,
    },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)
