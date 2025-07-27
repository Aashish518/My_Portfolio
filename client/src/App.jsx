import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css"; 
import ManageSkills from "./pages/ManageSkills";
import Login from "./pages/Login";
import ManageProjects from "./pages/ManageProjects";
import ManageUserdata from "./pages/UpdateUserData";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/manage-skills",
    element: <ManageSkills />,
  },
  {
    path: "/manage-projects",
    element: <ManageProjects />,
  },
  {
    path: "/manage-user",
    element: <ManageUserdata />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
