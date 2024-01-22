// mui
import { CardContent, CardHeader, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// components
import { AddressField } from 'src/components/common/custom-fields';
import { RHFTextField } from 'src/components/common/hook-form';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

// ----------------------------------------------------------------------

const InfoFields = () => {
  const { user } = useAppSelector(selectAuth);

  return (
    <Card>
      <CardHeader title="General Info" />
      <CardContent>
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

          {user?.userType === 'seller' && (
            <RHFTextField
              name="website"
              type="url"
              label="Website"
              sx={{ gridColumn: { xs: 'span 1', sm: 'span 2' } }}
              fullWidth
            />
          )}

          <Grid item sx={{ gridColumn: { xs: 'span 1', sm: 'span 2' } }}>
            <AddressField name="address" />
          </Grid>
        </Box>

        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <RHFTextField name="about" multiline rows={4} label="About" fullWidth />
        </Stack>
      </CardContent>
    </Card>
  );
};

InfoFields.propTypes = {};

export default InfoFields;
