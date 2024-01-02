'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropTypes from 'prop-types';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DashboardLayout>{children}</DashboardLayout>
      </LocalizationProvider>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
