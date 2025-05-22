import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, adminOnly = false }) {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
