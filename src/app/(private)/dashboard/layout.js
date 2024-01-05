'use client';

import PropTypes from 'prop-types';

import DashboardLayout from 'src/layouts/dashboard';
import Provider from 'src/lib/provider';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <Provider>
      <DashboardLayout>{children}</DashboardLayout>
    </Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
