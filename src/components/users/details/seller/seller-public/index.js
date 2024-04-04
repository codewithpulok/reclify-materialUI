'use client';

import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

import { ICONS } from '../../../config-users';
import UserCover from '../../common/user-cover';
import PublicContent from './public-content';

// ----------------------------------------------------------------------

const TABS = (serviceType) => [
  {
    value: '#profile',
    label: 'Profile',
    icon: ICONS.profile(),
  },
  {
    value: '#services',
    label: serviceType === 'warehouse' ? 'Warehouses' : 'Services',
    icon: ICONS.warehouse(),
  },
];

// ----------------------------------------------------------------------

/**
 * @param {SellerPrivateDetails.propTypes} props
 * @returns {JSX.Element}
 */
const SellerPrivateDetails = (props) => {
  const { user } = props;

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="Seller Details"
        links={[
          { name: 'Home', href: paths.root },
          { name: `${user?.firstName} ${user?.lastName}` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserCover tabs={TABS(user?.serviceType)} user={user} />

      <PublicContent user={user} />
    </Container>
  );
};

SellerPrivateDetails.propTypes = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
};

export default SellerPrivateDetails;
