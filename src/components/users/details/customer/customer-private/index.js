import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

import { ICONS } from '../../../config-users';
import UserCover from '../../common/user-cover';
import PrivateContent from './private-content';

const TABS = [
  {
    value: '#profile',
    label: 'Profile',
    icon: ICONS.profile(),
  },
  {
    value: '#transactions',
    label: 'Transactions',
    icon: ICONS.transactions(),
  },
];

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CustomerPrivateDetails = (props) => {
  const { user } = props;

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="Customer Details"
        links={[
          { name: 'Dasboard', href: paths.dashboard.root },
          { name: 'Merchants', href: paths.dashboard.users.customers },
          { name: `${user?.firstName} ${user?.lastName}` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserCover user={user} tabs={TABS} />
      <PrivateContent user={user} />
    </Container>
  );
};

CustomerPrivateDetails.propTypes = Props;

export default CustomerPrivateDetails;
