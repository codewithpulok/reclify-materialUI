import { LoadingButton } from '@mui/lab';
import { Button, Grid, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import InfoFields from './info-fields';
import LogoField from './logo-field';
import SocialFields from './socials-fields';

const Fields = () => {
  const { user } = useAppSelector(selectAuth);
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={8}>
        <InfoFields />
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={1.5}>
          {user?.userType === 'seller' && <LogoField />}

          <SocialFields />

          <LoadingButton
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            fullWidth
          >
            Save Changes
          </LoadingButton>

          <Button variant="soft" color="error" fullWidth>
            Delete Account
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Fields;
