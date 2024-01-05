import Stack from '@mui/material/Stack';

import { MenuItem } from '@mui/material';
import { regions } from 'src/assets/data';
import { PasswordField } from 'src/components/common/fields';
import { RHFTextField } from 'src/components/common/hook-form';

const Fields = (props) => (
  <Stack spacing={2.5}>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <RHFTextField name="firstName" label="First name" />
      <RHFTextField name="lastName" label="Last name" />
    </Stack>

    <RHFTextField name="region" label="Region" select>
      {regions.map((option) => (
        <MenuItem key={option.code} value={option.code}>
          {option.name}
        </MenuItem>
      ))}
    </RHFTextField>

    <RHFTextField name="userType" label="Account Type" select>
      <MenuItem value="customer">Customer</MenuItem>
      <MenuItem value="seller">Seller</MenuItem>
    </RHFTextField>

    <RHFTextField name="email" label="Email address" />

    <PasswordField name="password" label="Password" />
  </Stack>
);

Fields.propTypes = {};

export default Fields;
