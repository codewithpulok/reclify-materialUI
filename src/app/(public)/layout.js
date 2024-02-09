import PropTypes from 'prop-types';
import InitAuth from 'src/redux-toolkit/features/auth/init-auth';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <InitAuth>{children}</InitAuth>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
