import { Grid, Stack } from '@mui/material';

import { RHFCreditCardField, RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CardFields = (props) => (
  <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
    <Stack spacing={1}>
      <RHFCreditCardField name="cardNumber" type="number" label="Card Number" />
      <RHFTextField name="cardHolder" label="Card Holder" />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} display="flex" justifyContent="end">
          <RHFTextField name="expirationDate" label="Expiration Date" />
        </Grid>
        <Grid item xs={12} sm={6} display="flex" justifyContent="end">
          <RHFTextField name="cvv" type="number" label="CVV/CVC" />
        </Grid>
      </Grid>
      <RHFSwitch name="isPrimary" label="Primary" />
    </Stack>
  </Scrollbar>
);

CardFields.propTypes = Props;

export default CardFields;
