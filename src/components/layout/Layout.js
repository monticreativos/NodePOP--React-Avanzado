import T from 'prop-types';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children || <Outlet />}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: T.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
