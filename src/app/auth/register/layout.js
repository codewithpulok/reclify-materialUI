'use client';

import PropTypes from 'prop-types';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { GuestGuard } from 'src/redux-toolkit/features/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <AuthClassicLayout title="Manage the job more effectively with Racklify">
        {children}
      </AuthClassicLayout>
    </GuestGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
