import PropTypes from 'prop-types';
import DateProvider from 'src/providers/date-provider';
import { AuthGuard } from 'src/redux-toolkit/features/auth/guard';
import InitAuth from 'src/redux-toolkit/features/auth/init-auth';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <InitAuth>
      <DateProvider>
        <AuthGuard ignoreStripeCompleteStatus>{children}</AuthGuard>
      </DateProvider>
    </InitAuth>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
