import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { ServiceDetailsBox } from '../../box';

const Props = {
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServicePromo = (props) => {
  const { sx } = props;

  return (
    <ServiceDetailsBox title="Promotion Code" sx={sx}>
      <TextField
        label="Promotion Code"
        fullWidth
        helperText="enter promotion code to get exciting discount"
      />
    </ServiceDetailsBox>
  );
};

ServicePromo.propTypes = Props;

export default ServicePromo;
