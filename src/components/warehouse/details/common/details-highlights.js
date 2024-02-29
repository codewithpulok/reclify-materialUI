import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

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
  const { highlights, sx = {} } = props;

  return (
    <Typography sx={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 22, ...sx }}>
      {highlights}
    </Typography>
  );
};

DetailsHighlights.propTypes = Props;

export default DetailsHighlights;
