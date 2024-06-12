// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.email !== 'keithkadima@gmail.com') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
