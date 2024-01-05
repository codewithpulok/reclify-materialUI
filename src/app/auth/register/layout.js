'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropTypes from 'prop-types';
import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <GuestGuard>
        <AuthClassicLayout title="Manage the job more effectively with Racklify">
          {children}
        </AuthClassicLayout>
      </GuestGuard>
    </LocalizationProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
