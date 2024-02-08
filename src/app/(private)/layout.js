'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropTypes from 'prop-types';
import { AuthGuard } from 'src/redux-toolkit/features/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthGuard>{children}</AuthGuard>
    </LocalizationProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
