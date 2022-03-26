import React from 'react';
import T from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { LoginPage, RequireAuth } from '../auth';
import { AuthProvider } from '../auth/context';
import NotFoundPage from './NotFoundPage';
import Layout from '../layout';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  const authProps = { isLogged, handleLogin, handleLogout };

  return (
    <AuthProvider {...authProps}>
      <Routes>
        <Route
          path="/adverts"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<AdvertsPage />} />
          <Route path="new" element={<NewAdvertPage />} />
          <Route path=":advertId" element={<AdvertPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/404" element={<Layout />}>
          <Route index element={<NotFoundPage />} />
        </Route>
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
