import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    navigate('/login');
    return null; // Return null to prevent rendering of protected content
  }

  // Render protected content if the user is authenticated
  return <>{children}</>;
};

export default PrivateRoute;
