import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { ServiceDetailsBox } from '../../box';

const Props = {
  description: PropTypes.string.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceDescription = (props) => {
  const { description, sx } = props;

  return (
    <ServiceDetailsBox title="Description" sx={sx}>
      <Typography variant="body2">{description}</Typography>
    </ServiceDetailsBox>
  );
};

ServiceDescription.propTypes = Props;

export default ServiceDescription;
