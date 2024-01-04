import { Grid, MenuItem, Stack } from '@mui/material';

import { AddressField } from 'src/components/common/fields';
import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';

const FieldsProps = {};

/**
 * @param {FieldsProps} props
 * @returns {JSX.Element}
 */
const Fields = (props) => (
  <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
    <Stack spacing={1}>
      <RHFTextField name="fullName" label="Full Name" />
      <RHFTextField name="phoneNumber" label="Phone Number" />
      <RHFTextField name="email" type="email" label="Email" />
      <AddressField name="address" />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <RHFTextField name="addressType" label="Address Type" fullWidth select>
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="office">Office</MenuItem>
          </RHFTextField>
        </Grid>
        <Grid item xs={12} sm={6} display="flex" justifyContent="end">
          <RHFSwitch name="primary" label="Primary" sx={{ ml: 'auto' }} />
        </Grid>
      </Grid>
    </Stack>
  </Scrollbar>
);

Fields.propTypes = FieldsProps;

export default Fields;