'use client';

import PropTypes from 'prop-types';
import { RoleBasedGuard } from 'src/redux-toolkit/features/auth/guard';

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
