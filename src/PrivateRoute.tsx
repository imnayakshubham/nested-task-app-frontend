import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';


const PrivateRoute = () => {
  const { userInfo } = useAuth()

  return !!userInfo.token ? <Outlet /> : <Navigate to="/login" />;

};

export default PrivateRoute;
