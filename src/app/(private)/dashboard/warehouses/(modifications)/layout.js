'use client';

import PropTypes from 'prop-types';
import { RoleBasedGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <RoleBasedGuard roles={['seller']} hasContent>
      {children}
    </RoleBasedGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
