import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { getSellers } from 'src/assets/dummy';
import { useResponsive } from 'src/hooks/use-responsive';
import HeaderContent from './header-content';
import MainContent from './main-content';
import SidebarContent from './sidebar-content';

const Props = {
  service: PropTypes.object.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceDetails = (props) => {
  const { service } = props;
  const seller = getSellers()[0];

  const mdUp = useResponsive('up', 'md');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeaderContent service={service} />
      </Grid>
      <Grid item xs={12} md={7}>
        <MainContent service={service} seller={seller} />
      </Grid>
      <Grid item xs={12} md={5}>
        {mdUp && <SidebarContent service={service} seller={seller} />}
      </Grid>
    </Grid>
  );
};

ServiceDetails.propTypes = Props;

export default ServiceDetails;
