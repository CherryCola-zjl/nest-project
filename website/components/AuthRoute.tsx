import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
