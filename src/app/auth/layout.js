'use client';

import PropTypes from 'prop-types';
import InitAuth from 'src/redux-toolkit/features/auth/init-auth';

import Provider from 'src/redux-toolkit/provider';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <Provider>
      <InitAuth>{children}</InitAuth>
    </Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
