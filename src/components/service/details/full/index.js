import { Container, Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import ImageCarousel from '../common/image-carousel';
import ServiceCustomers from '../common/service-customers';
import ServiceFeatures from '../common/service-features';
import ServicePromo from '../common/service-promo';
import HeaderContent from './header-content';
import MainContent from './main-content';
import SidebarContent from './sidebar-content';

const Props = {
  /** @type {Service} */
  service: PropTypes.object.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceDetails = (props) => {
  const { service } = props;
  const seller = service?.seller;
  const appearance = useAppearance();

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderContent service={service} />
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
    </Container>
  );
};

ServiceDetails.propTypes = Props;

export default ServiceDetails;
