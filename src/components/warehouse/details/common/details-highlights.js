import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { WarehouseDetailsBox } from '../../box';

const Props = {
  highlights: PropTypes.string,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns
 */
const DetailsHighlights = (props) => {
  const { highlights, sx = {} } = props;

  return (
    <WarehouseDetailsBox title="Highlights" sx={sx}>
      <Typography sx={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 22 }}>
        {highlights}
      </Typography>
    </WarehouseDetailsBox>
  );
};

DetailsHighlights.propTypes = Props;

export default DetailsHighlights;
