import Stack from '@mui/material/Stack';

import { MenuItem } from '@mui/material';
import { PasswordField } from 'src/components/common/custom-fields';
import { RHFTextField } from 'src/components/common/hook-form';

const Fields = (props) => (
  <Stack spacing={2.5}>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <RHFTextField name="firstName" label="First name" />
      <RHFTextField name="lastName" label="Last name" />
    </Stack>

    <RHFTextField name="userType" label="Account Type" select>
      <MenuItem value="customer">Customer</MenuItem>
      <MenuItem value="seller">Service Provider</MenuItem>
    </RHFTextField>

    <RHFTextField name="email" label="Email address" />

    <PasswordField name="password" label="Password" />
  </Stack>
);

Fields.propTypes = {};

export default Fields;
