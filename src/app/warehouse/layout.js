'use client';

import PropTypes from 'prop-types';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import Provider from 'src/lib/provider';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <Provider>
        <DashboardLayout>{children}</DashboardLayout>
      </Provider>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
