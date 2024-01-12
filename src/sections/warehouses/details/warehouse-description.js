import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { WarehouseDetailsBox } from 'src/components/warehouse/box';

const WarehouseDescriptionProps = {
  description: PropTypes.string.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 *  Warehouse description
 * @param {WarehouseDescriptionProps} props
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

WarehouseDescription.propTypes = WarehouseDescriptionProps;

export default WarehouseDescription;
