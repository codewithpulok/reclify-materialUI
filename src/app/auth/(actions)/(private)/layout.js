import PropTypes from 'prop-types';
import { AuthGuard } from 'src/redux-toolkit/features/auth/guard';
import InitAuth from 'src/redux-toolkit/features/auth/init-auth';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <InitAuth>
      <AuthGuard ignoreStripeCompleteStatus>{children}</AuthGuard>
    </InitAuth>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
