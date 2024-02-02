import PropTypes from 'prop-types';

import PublicDashboardLayout from 'src/layouts/public-dashboard';
import Provider from 'src/redux-toolkit/provider';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <Provider>
      <PublicDashboardLayout>{children}</PublicDashboardLayout>
    </Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
