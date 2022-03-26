import T from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from '../context';

const RequireAuth = ({ children }) => {
  const { isLogged } = useAuthContext();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

RequireAuth.propTypes = {
  children: T.node,
};

export default RequireAuth;
