import React from 'react';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import AboutMe from '../pages/AboutMe';
import Recipe from '../pages/Recipe';
interface Route {
  path: string;
  component: React.ReactNode;
  isPrivate: boolean;
  allowedRoles?: string[];
}

const RouteConfig: Route[] = [
  {
    path: '/home',
    component: <Home />,
    isPrivate: false,
  },
  {
    path: '/profile',
    component: <Profile />,
    isPrivate: false,
  },
  {
    path: '/login',
    component: <Login />,
    isPrivate: false,
  },
  {
    path: '/register',
    component: <Register />,
    isPrivate: false,
  },
  {
    path: '/about',
    component: <AboutMe />,
    isPrivate: false,
  },
  {
    path: '/forgotPassword',
    component: <ForgotPassword />,
    isPrivate: false,
  },
  {
    path: '/recipes',
    component: <Recipe />,
    isPrivate: false,
  },
  {
    path: '/profile22',
    component: <Profile />,
    isPrivate: true,
    allowedRoles: ['User', 'Creator'],
  }
];

export default RouteConfig;
