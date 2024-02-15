import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { UserDetailsCard } from 'src/components/users/cards';
import ServiceFeatures from '../common/service-features';
import ServiceInfo from '../common/service-info';
import ServiceKeyFeatures from '../common/service-keyfeatures';

const Props = {
  /** @type {Service} */
  service: PropTypes.object,
  /** @type {User} */
  seller: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SidebarContent = (props) => {
  const { service, seller } = props;

  return (
    <Stack spacing={2}>
      <UserDetailsCard user={seller} />
      <ServiceFeatures features={service.features} type={service.type} />
      <ServiceInfo service={service} />
      <ServiceKeyFeatures keyFeatures={service?.keyFeatures} />
    </Stack>
  );
};

SidebarContent.propTypes = Props;

export default SidebarContent;
