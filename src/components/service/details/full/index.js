import { Container, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import ServiceCustomers from '../common/service-customers';
import ServiceDescription from '../common/service-description';
import ServiceFeatures from '../common/service-features';
import ServiceHighlights from '../common/service-highlights';
import ServiceKeyFeatures from '../common/service-keyfeatures';
import HeaderContent from './header-content';
import SidebarOne from './sidebar-one';
import SidebarTwo from './sidebar-two';

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
          <SidebarOne seller={seller} service={service} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SidebarTwo service={service} />
        </Grid>

        <Grid item xs={12}>
          <ServiceHighlights highlights={service?.highlights} />
        </Grid>

        <Grid item xs={12}>
          <ServiceKeyFeatures keyFeatures={service?.keyFeatures} />
        </Grid>

        <Grid item xs={12}>
          <ServiceDescription description={service?.description} />
        </Grid>

        {!!service.customerList?.length && (
          <Grid item xs={12}>
            <ServiceCustomers data={service.customerList} />
          </Grid>
        )}

        <Grid item xs={12}>
          <ServiceFeatures features={service.features} type={service.type} />
        </Grid>
      </Grid>
    </Container>
  );
};

ServiceDetails.propTypes = Props;

export default ServiceDetails;
