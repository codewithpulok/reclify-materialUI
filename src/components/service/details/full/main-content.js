import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useResponsive } from 'src/hooks/use-responsive';
import ImageCarousel from '../common/image-carousel';
import ServiceDescription from '../common/service-description';
import SidebarContent from './sidebar-content';

const Props = {
  /** @type {Service} */
  service: PropTypes.object,
  /** @type {User} */
  seller: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const MainContent = (props) => {
  const { service, seller } = props;

  const mdDown = useResponsive('down', 'md');

  return (
    <Stack spacing={2}>
      <ImageCarousel list={service?.photos || []} />
      {mdDown && <SidebarContent service={service} seller={seller} />}
      <ServiceDescription description={service.description} />
    </Stack>
  );
};

MainContent.propTypes = Props;

export default MainContent;
