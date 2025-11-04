import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import Loader from './child/Loader';

export default function ProtectedRoute({ children }) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
