'use client';

import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';
import InitAuth from 'src/redux-toolkit/features/auth/init-auth';
import Provider from 'src/redux-toolkit/provider';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <Provider>
      <InitAuth>
        <MainLayout>{children}</MainLayout>
      </InitAuth>
    </Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
