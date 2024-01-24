import Stack from '@mui/material/Stack';

import { MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { PasswordField } from 'src/components/common/custom-fields';
import { RHFTextField } from 'src/components/common/hook-form';
import { serviceTypes } from 'src/constant/service-types';
import { useBoolean } from 'src/hooks/use-boolean';

const Fields = (props) => {
  const { watch } = useFormContext();

  const userType = watch('userType');

  const showUserTypeField = useBoolean(true);

  const serviceField =
    userType === 'seller' ? (
      <RHFTextField name="serviceType" label="Service Type" select>
        {serviceTypes.map((serviceType) => (
          <MenuItem key={serviceType.value} value={serviceType.value}>
            {serviceType.label}
          </MenuItem>
        ))}
      </RHFTextField>
    ) : null;

  return (
    <Stack spacing={2.5}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="firstName" label="First name" />
        <RHFTextField name="lastName" label="Last name" />
      </Stack>

      <RHFTextField
        name="email"
        label="Email address"
        onChangeMiddleware={(v) => {
          if (v?.includes('@racklify.com')) {
            showUserTypeField.onFalse();
          } else {
            showUserTypeField.onTrue();
          }
          return v;
        }}
      />

      {showUserTypeField.value && (
        <RHFTextField name="userType" label="Account Type" select>
          <MenuItem value="customer">Customer</MenuItem>
          <MenuItem value="seller">Service Provider</MenuItem>
        </RHFTextField>
      )}

      {serviceField}

      <PasswordField name="password" label="Password" />
    </Stack>
  );
};

Fields.propTypes = {};

export default Fields;
