import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import ServiceHighlights from '../common/service-highlights';
import ServiceKeyFeatures from '../common/service-keyfeatures';

const Props = {
  /** @type {Service} */
  service: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const MainContent = (props) => {
  const { service } = props;

  return (
    <Stack spacing={2}>
      <ServiceHighlights highlights={service?.highlights} />
      <ServiceKeyFeatures keyFeatures={service?.keyFeatures} />
    </Stack>
  );
};

MainContent.propTypes = Props;

export default MainContent;
