import { useFormContext } from 'react-hook-form';
// mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Grid, MenuItem } from '@mui/material';
// components
import { AddressField } from 'src/components/common/custom-fields';
import { RHFTextField } from 'src/components/common/hook-form';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

// ----------------------------------------------------------------------

const GeneralInfoFields = () => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;
  const { user } = useAppSelector(selectAuth);

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
        <RHFTextField name="firstName" label="First Name" fullWidth />
        <RHFTextField name="lastName" label="Last Name" fullWidth />
        <RHFTextField name="email" label="Email Address" fullWidth />
        <RHFTextField name="phoneNumber" label="Phone Number" fullWidth />

        <Grid item sx={{ gridColumn: { xs: 'span 1', sm: 'span 2' } }}>
          <AddressField name="address" />
        </Grid>
      </Box>

      <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
        <RHFTextField name="about" multiline rows={4} label="About" fullWidth />

        <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
          Save Changes
        </LoadingButton>
      </Stack>
    </Card>
  );
};

GeneralInfoFields.propTypes = {};

export default GeneralInfoFields;
