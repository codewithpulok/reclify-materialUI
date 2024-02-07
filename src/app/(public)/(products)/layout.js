import PropTypes from 'prop-types';

import PublicDashboardLayout from 'src/layouts/public-dashboard';
import InitAuth from 'src/redux-toolkit/features/auth/init-auth';
import Provider from 'src/redux-toolkit/provider';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <Provider>
      <InitAuth>
        <PublicDashboardLayout>{children}</PublicDashboardLayout>
      </InitAuth>
    </Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
