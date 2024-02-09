'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropTypes from 'prop-types';
import { AuthGuard } from 'src/redux-toolkit/features/auth/guard';
import InitAuth from 'src/redux-toolkit/features/auth/init-auth';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <InitAuth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthGuard>{children}</AuthGuard>
      </LocalizationProvider>
    </InitAuth>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
