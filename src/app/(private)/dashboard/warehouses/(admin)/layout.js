import PropTypes from 'prop-types';
import { RoleBasedGuard } from 'src/redux-toolkit/features/auth/guard';

const Layout = (props) => {
  const { children } = props;
  return (
    <RoleBasedGuard roles={['admin']} hasContent>
      {children}
    </RoleBasedGuard>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
