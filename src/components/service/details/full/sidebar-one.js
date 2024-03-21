import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { UserDetailsCard } from 'src/components/users/cards';
import ServiceInfo from '../common/service-info';
import ServicePromo from '../common/service-promo';

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
const SidebarOne = (props) => {
  const { service, seller } = props;

  return (
    <Stack spacing={2}>
      {!!seller && <UserDetailsCard user={seller} />}
      <ServiceInfo service={service} />
      <ServicePromo service={service} />
    </Stack>
  );
};

SidebarOne.propTypes = Props;

export default SidebarOne;
