'use client';

import PropTypes from 'prop-types';

import { RoleBasedGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function WarehouseUsersLayout({ children }) {
  return (
    <RoleBasedGuard roles={['admin']} hasContent>
      {children}
    </RoleBasedGuard>
  );
}

WarehouseUsersLayout.propTypes = {
  children: PropTypes.node,
};
