import React from "react";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ForgotPassword from "../pages/forgotpassword/ForgotPassword";
import AdminDashboard from "../pages/admindashboard/AdminDashboard";
import Dashboard from "../pages/dashboard/Dashboard";
import AllUser from "../pages/alluser/AllUser";
import AdminTodos from "../pages/admintodos/AdminTodos.tsx";
import Todo from "../pages/todo/Todo.tsx";
import AdminTodoStatistics from "../pages/admintodostatistics/AdminTodoStatistics.tsx";
import CreateTodo from "../pages/createtodo/CreateTodo.tsx";

interface Route {
  path: string;
  component: React.ReactNode;
  isPrivate: boolean;
  allowedRoles?: string[];
}

const RouteConfig: Route[] = [
  {
    path: "/home",
    component: <Home />,
    isPrivate: false,
  },
  {
    path: "/admindashboard",
    component: <AdminDashboard />,
    isPrivate: false,
  },
  {
    path: "/login",
    component: <Login />,
    isPrivate: false,
  },
  {
    path: "/register",
    component: <Register />,
    isPrivate: false,
  },
  {
    path: "user/todo",
    component: <Todo />,
    isPrivate: false,
  },
  {
    path: "user/create",
    component: <CreateTodo />,
    isPrivate: false,
  },
  {
    path: "admin/admintodos",
    component: <AdminTodos />,
    isPrivate: false,
  },
  {
    path: "admin/stistics",
    component: <AdminTodoStatistics />,
    isPrivate: false,
  },
  // {
  //   path: "/about",
  //   component: <AboutMe />,
  //   isPrivate: false,
  // },
  {
    path: "/forgotPassword",
    component: <ForgotPassword />,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
    isPrivate: false,
  },
  {
    path: "/admin/users",
    component: <AllUser />,
    isPrivate: false,
  },
  // {
  //   path: "/profile22",
  //   component: <Profile />,
  //   isPrivate: true,
  //   allowedRoles: ["User", "Creator"],
  // },
];

export default RouteConfig;
