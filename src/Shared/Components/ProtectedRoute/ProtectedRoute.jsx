import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../services/store/useAuth';


const ProtectedRoute = ({ allowedRoles }) => {
  const { userdetails } = useAuth();
  const userRole = userdetails()?.Role; 
  if (!userRole) {return <Navigate to="/login" />;}
  if (allowedRoles.includes(userRole)) {return <Outlet />;} else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
