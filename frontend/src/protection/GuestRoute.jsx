import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function GuestRoute({ children }) {
  const { token, role } = useSelector((state) => state.auth);

  if (token) {
    // Redirect logged-in users
    return <Navigate to={role === 'admin' ? '/admin' : '/'} replace />;
  }

  return children;
}

export default GuestRoute;
