import { Grid, Stack } from '@mui/material';

import {
  RHFCreditCardField,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
} from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';

const FieldsProps = {};

/**
 * @param {PaymentCardCreateFieldsProps} props
 * @returns {JSX.Element}
 */
const Fields = (props) => (
  <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
    <Stack spacing={1}>
      <RHFCreditCardField name="number" type="number" label="Card Number" />
      <RHFTextField name="holder" label="Card Holder" />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} display="flex" justifyContent="end">
          <RHFDatePicker name="expire" label="Expiration Date" views={['month', 'year']} />
        </Grid>
        <Grid item xs={12} sm={6} display="flex" justifyContent="end">
          <RHFTextField name="securityNumber" label="CVV/CVC" />
        </Grid>
      </Grid>
      <RHFSwitch name="primary" label="Primary" />
    </Stack>
  </Scrollbar>
);

Fields.propTypes = FieldsProps;

export default Fields;
