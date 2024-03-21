import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import ImageCarousel from '../common/image-carousel';

const Props = {
  /** @type {Service} */
  service: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SidebarTwo = (props) => {
  const { service } = props;

  return (
    <Stack spacing={2}>
      <ImageCarousel list={service?.photos || []} />
    </Stack>
  );
};

SidebarTwo.propTypes = Props;

export default SidebarTwo;
