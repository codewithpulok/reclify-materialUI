import { useFormContext } from 'react-hook-form';
import { countries } from 'src/assets/data';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { RHFAutocomplete, RHFTextField } from 'src/components/common/hook-form';
import { getIconify } from 'src/components/common/iconify/utilities';

// ----------------------------------------------------------------------

const getFlagIcon = (code) => getIconify(`circle-flags:${code}`, 28, { mr: 1 });

const GeneralInfoFields = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Card sx={{ p: 3 }}>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
      >
        <RHFTextField name="displayName" label="Name" />
        <RHFTextField name="email" label="Email Address" />
        <RHFTextField name="phoneNumber" label="Phone Number" />
        <RHFTextField name="address" label="Address" />

        <RHFAutocomplete
          name="country"
          label="Country"
          options={countries.map((country) => country.label)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => {
            const { code, label, phone } = countries.filter(
              (country) => country.label === option
            )[0];

            if (!label) {
              return null;
            }

            return (
              <li {...props} key={label}>
                {getFlagIcon(code.toLowerCase())}
                {label} ({code}) +{phone}
              </li>
            );
          }}
        />

        <RHFTextField name="state" label="State/Region" />
        <RHFTextField name="city" label="City" />
        <RHFTextField name="zipCode" label="Zip/Code" />
      </Box>

      <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
        <RHFTextField name="about" multiline rows={4} label="About" />

        <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
          Save Changes
        </LoadingButton>
      </Stack>
    </Card>
  );
};

GeneralInfoFields.propTypes = {};

export default GeneralInfoFields;
