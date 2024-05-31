/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? element : <Navigate to='/login' />;
};

export default ProtectedRoute;
