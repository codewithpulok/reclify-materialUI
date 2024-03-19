import PropTypes from 'prop-types';
import DateProvider from 'src/providers/date-provider';
import StripeProvider from 'src/providers/stripe-provider';
import { AuthGuard } from 'src/redux-toolkit/features/auth/guard';
import InitAuth from 'src/redux-toolkit/features/auth/init-auth';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <InitAuth>
      <StripeProvider>
        <DateProvider>
          <AuthGuard>{children}</AuthGuard>
        </DateProvider>
      </StripeProvider>
    </InitAuth>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
