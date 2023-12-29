'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropTypes from 'prop-types';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import Provider from 'src/lib/provider';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <Provider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DashboardLayout>{children}</DashboardLayout>
        </LocalizationProvider>
      </Provider>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
