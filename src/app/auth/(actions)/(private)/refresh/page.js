import { RoleBasedGuard } from 'src/redux-toolkit/features/auth/guard';
import RefreshView from 'src/sections/auth/refresh/view';

// ----------------------------------------------------------------------
const Props = {};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RefreshPage = (props) => (
  <RoleBasedGuard roles={['seller']} hasContent>
    <RefreshView />
  </RoleBasedGuard>
);

RefreshPage.propTypes = Props;

export default RefreshPage;
