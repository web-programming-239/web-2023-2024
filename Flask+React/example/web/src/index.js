import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CreateUser from "./CreateUser";
import Users from "./Users";

const router = createBrowserRouter([

    {
        path: "/users",
        element: <Users/>,
    },
    {
        path: "/create_user",
        element: <CreateUser/>
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
