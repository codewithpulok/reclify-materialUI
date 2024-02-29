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
const ServiceHighlights = (props) => {
  const { highlights, sx = {} } = props;

  return (
    <Typography sx={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 22, ...sx }}>
      {highlights}
    </Typography>
  );
};

ServiceHighlights.propTypes = Props;

export default ServiceHighlights;
