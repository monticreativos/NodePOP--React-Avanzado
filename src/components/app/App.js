import React from 'react';
import T from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { LoginPage, RequireAuth } from '../auth';
import { AuthProvider } from '../auth/context';
import NotFoundPage from './NotFoundPage';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  const authProps = { isLogged, handleLogin, handleLogout };

  return (
    <AuthProvider {...authProps}>
      <Routes>
        <Route
          path="/adverts/new"
          element={
            <RequireAuth>
              <NewAdvertPage />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/:advertId"
          element={
            <RequireAuth>
              <AdvertPage />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts"
          element={
            <RequireAuth>
              <AdvertsPage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </AuthProvider>
  );
}

App.propTypes = {
  isInitiallyLogged: T.bool,
};

App.defaultProps = {
  isInitiallyLogged: false,
};

export default App;
