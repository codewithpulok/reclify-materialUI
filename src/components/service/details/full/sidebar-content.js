import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { UserDetailsCard } from 'src/components/users/cards';
import ServiceDescription from '../common/service-description';
import ServiceInfo from '../common/service-info';

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
      {!!seller && <UserDetailsCard user={seller} />}
      <ServiceInfo service={service} />
      <ServiceDescription description={service.description} />
    </Stack>
  );
};

SidebarContent.propTypes = Props;

export default SidebarContent;
