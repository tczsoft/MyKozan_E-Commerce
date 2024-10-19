

import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../Shared/Services/Store/useAuth';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth(); 
  const userRole = user?.role;

  if (!user) {
  
    return <Navigate to="/admin/dashboard" />;
  }

  if (allowedRoles.includes(userRole)) {
  
    return children ? children : <Outlet />;
  } else {
 
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
