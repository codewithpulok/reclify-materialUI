import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ServiceDetailsBox } from '../../box';

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
    <ServiceDetailsBox title="Highlights" sx={sx}>
      <Typography sx={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: 22 }}>
        {highlights}
      </Typography>
    </ServiceDetailsBox>
  );
};

ServiceHighlights.propTypes = Props;

export default ServiceHighlights;
