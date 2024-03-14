import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import ImageCarousel from '../common/image-carousel';
import ServiceCustomers from '../common/service-customers';
import ServiceFeatures from '../common/service-features';
import ServicePromo from '../common/service-promo';
import HeaderContent from '../full/header-content';
import MainContent from '../full/main-content';
import SidebarContent from '../full/sidebar-content';

const Props = {
  service: PropTypes.object.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceDetailsPreview = (props) => {
  const { service } = props;

  const seller = service?.seller;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeaderContent service={service} hideBack />
      </Grid>
      <Grid item xs={12} md={6}>
        <SidebarContent service={service} seller={seller} />
      </Grid>
      <Grid item xs={12} md={6}>
        <MainContent service={service} seller={seller} />
      </Grid>
      {!!service.customerList?.length && (
        <Grid item xs={12}>
          <ServiceCustomers data={service.customerList} />
        </Grid>
      )}
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <ImageCarousel list={service?.photos || []} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <ServicePromo service={service} />
          <ServiceFeatures features={service.features} type={service.type} />
        </Stack>
      </Grid>
    </Grid>
  );
};

ServiceDetailsPreview.propTypes = Props;

export default ServiceDetailsPreview;
