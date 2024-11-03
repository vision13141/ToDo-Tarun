import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ToDo from './Componenets/Layouts/ToDo.jsx';
import Login from './Componenets/Layouts/Login.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicRoute from './utils/PublicRoute.jsx';
import PrivateRoute from './utils/PrivateRoute.jsx';

const router = createBrowserRouter([
    {
        path: '/signup',
        element: <PublicRoute><App /></PublicRoute>,
    },
    {
        path: '/',
        element: <PublicRoute><Login /></PublicRoute>,
    },
    {
        path: '/todo',
        element: <PrivateRoute><ToDo /></PrivateRoute>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
