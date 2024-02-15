import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { WarehouseDetailsBox } from 'src/components/warehouse/box';

const Props = {
  highlights: PropTypes.string,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 *  Warehouse description
 * @param {Props} props
 * @returns
 */
const DetailsHighlights = (props) => {
  const { highlights, sx } = props;

  return (
    <WarehouseDetailsBox title="Highlights" sx={sx}>
      <Typography variant="body2">{highlights}</Typography>
    </WarehouseDetailsBox>
  );
};

DetailsHighlights.propTypes = Props;

export default DetailsHighlights;
