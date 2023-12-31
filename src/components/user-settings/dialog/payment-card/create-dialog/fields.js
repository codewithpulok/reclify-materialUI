import { Grid, MenuItem, Stack } from '@mui/material';
import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';

const PaymentCardCreateFieldsProps = {};

/**
 * @param {PaymentCardCreateFieldsProps} props
 * @returns {JSX.Element}
 */
const PaymentCardCreateFields = (props) => (
  <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
    <Stack spacing={1}>
      <RHFTextField name="cardNumber" label="Card Number" />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <RHFTextField name="cardType" label="Card Type" fullWidth select>
            <MenuItem value="mastercard">Mastercard</MenuItem>
            <MenuItem value="visa">Visa</MenuItem>
          </RHFTextField>
        </Grid>
        <Grid item xs={12} sm={6} display="flex" justifyContent="end">
          <RHFSwitch name="primary" label="Primary" sx={{ ml: 'auto' }} />
        </Grid>
      </Grid>
    </Stack>
  </Scrollbar>
);

PaymentCardCreateFields.propTypes = PaymentCardCreateFieldsProps;

export default PaymentCardCreateFields;
