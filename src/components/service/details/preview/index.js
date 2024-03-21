import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ServiceCustomers from '../common/service-customers';
import ServiceDescription from '../common/service-description';
import ServiceFeatures from '../common/service-features';
import ServiceHighlights from '../common/service-highlights';
import ServiceKeyFeatures from '../common/service-keyfeatures';
import HeaderContent from '../full/header-content';
import SidebarOne from '../full/sidebar-one';
import SidebarTwo from '../full/sidebar-two';

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
  );
};

ServiceDetailsPreview.propTypes = Props;

export default ServiceDetailsPreview;
