import PropTypes from 'prop-types';

import PublicDashboardLayout from 'src/layouts/public-dashboard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <PublicDashboardLayout>{children}</PublicDashboardLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
