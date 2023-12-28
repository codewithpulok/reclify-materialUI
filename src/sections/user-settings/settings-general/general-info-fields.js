import { useFormContext } from 'react-hook-form';
import { regions } from 'src/assets/data';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { Grid, MenuItem } from '@mui/material';
import { AddressField } from 'src/components/common/fields';
import { RHFTextField } from 'src/components/common/hook-form';

// ----------------------------------------------------------------------

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

        <RHFTextField name="region" label="Region" select>
          {regions.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.name}
            </MenuItem>
          ))}
        </RHFTextField>

        <Grid item sx={{ gridColumn: { xs: 'span 1', sm: 'span 2' } }}>
          <AddressField name="address" />
        </Grid>
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
