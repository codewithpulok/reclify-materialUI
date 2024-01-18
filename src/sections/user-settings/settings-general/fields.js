import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import InfoFields from './info-fields';
import SocialFields from './socials-fields';

const Fields = () => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={8}>
        <InfoFields />
      </Grid>

      <Grid item xs={12} md={4}>
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

        <Button variant="soft" color="error" sx={{ mt: 1 }} fullWidth>
          Delete Account
        </Button>
      </Grid>
    </Grid>
  );
};

export default Fields;
