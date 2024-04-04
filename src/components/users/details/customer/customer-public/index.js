import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

import UserCover from '../../common/user-cover';
import HomeSection from '../common/home-section';

const Props = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CustomerPublicDetails = (props) => {
  const { user } = props;

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="Customer Details"
        links={[
          { name: 'Home', href: paths.root },
          { name: `${user?.firstName} ${user?.lastName}` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserCover user={user} />
      <HomeSection user={user} />
    </Container>
  );
};

CustomerPublicDetails.propTypes = Props;

export default CustomerPublicDetails;
