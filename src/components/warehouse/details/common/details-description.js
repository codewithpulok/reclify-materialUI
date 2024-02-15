import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { WarehouseDetailsBox } from 'src/components/warehouse/box';

const Props = {
  description: PropTypes.string,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 *  Warehouse description
 * @param {Props} props
 * @returns
 */
const WarehouseDescription = (props) => {
  const { description, sx } = props;

  return (
    <WarehouseDetailsBox title="Description" sx={sx}>
      <Typography variant="body2">{description}</Typography>
    </WarehouseDetailsBox>
  );
};

WarehouseDescription.propTypes = Props;

export default WarehouseDescription;
