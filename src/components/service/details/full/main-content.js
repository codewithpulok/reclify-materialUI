import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import ServiceFeatures from '../common/service-features';
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
      <ServiceFeatures features={service.features} type={service.type} />
      <ServiceKeyFeatures keyFeatures={service?.keyFeatures} />
    </Stack>
  );
};

MainContent.propTypes = Props;

export default MainContent;
