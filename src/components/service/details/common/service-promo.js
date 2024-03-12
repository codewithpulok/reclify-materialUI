import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { ServiceDetailsBox } from '../../box';

const Props = {
  /** @type {SxProps} */
  sx: PropTypes.object,
  /** @type {Service} */
  service: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServicePromo = (props) => {
  const { sx, service } = props;

  return (
    <ServiceDetailsBox title="Promotion Code" sx={sx}>
      {service?.promoCode ? (
        <Typography variant="h4">{service.promoCode}</Typography>
      ) : (
        <Typography color="text.secondary">No Promotion code are available</Typography>
      )}
    </ServiceDetailsBox>
  );
};

ServicePromo.propTypes = Props;

export default ServicePromo;
