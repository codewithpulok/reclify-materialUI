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
    <Typography variant="h4" sx={{ fontStyle: 'italic', ...sx }}>
      {highlights}
    </Typography>
  );
};

DetailsHighlights.propTypes = Props;

export default DetailsHighlights;
