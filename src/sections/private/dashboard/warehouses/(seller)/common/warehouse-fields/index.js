import Grid from '@mui/material/Grid';
// local components
import PropTypes from 'prop-types';

import { EmptyState } from 'src/components/common/custom-state';
import Step0 from './step-0';
import Step1 from './step-1';
import Step2 from './step-2';

export const stepFields = {
  0: [
    'name',
    'address',
    'regionScope',
    'region',
    'description',
    'highlights',
    'photos',
    'services',
  ],
  1: ['features', 'amenities', 'facilityDetails', 'documents'],
  2: [
    'totalSpace',
    'minSpaceOrder',
    'maxSpaceOrder',
    'price1',
    'price3',
    'price6',
    'price12',
    'discountRate',
  ],
};

const Props = {
  activeStep: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  excludeImages: PropTypes.arrayOf(PropTypes.string),
};

const WarehouseFields = (props) => {
  const { activeStep = 'CREATE', excludeImages = [] } = props;

  if (activeStep === 0) {
    return (
      <Grid container spacing={1.2}>
        <Step0 excludeImages={excludeImages} />
      </Grid>
    );
  }

  if (activeStep === 1) {
    return (
      <Grid container spacing={1.2}>
        <Step1 />
      </Grid>
    );
  }

  if (activeStep === 2) {
    return (
      <Grid container spacing={1.2}>
        <Step2 />
      </Grid>
    );
  }

  return <EmptyState />;
};

WarehouseFields.propTypes = Props;

export default WarehouseFields;
