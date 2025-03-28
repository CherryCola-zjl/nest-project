import React from 'react';
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import NotFound from '../pages/NotFound';
import { Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/app',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
