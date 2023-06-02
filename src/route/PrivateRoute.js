import React from 'react';
import { Routes, useNavigate } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated }) {
    let navigate = useNavigate();
    
    React.useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);
  
    return (
      <Routes>
        {isAuthenticated ? children : null}
      </Routes>
    );
  }

export default PrivateRoute;