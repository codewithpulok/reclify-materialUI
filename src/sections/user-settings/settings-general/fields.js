import { Button, Grid } from '@mui/material';
import GeneralInfoFields from './general-info-fields';
import SocialFields from './socials-fields';

const Fields = () => (
  <Grid container spacing={3}>
    <Grid xs={12} md={8}>
      <GeneralInfoFields />
    </Grid>

    <Grid item xs={12} md={4}>
      <SocialFields />
      <Button variant="soft" color="error" sx={{ mt: 3 }} fullWidth>
        Delete Account
      </Button>
    </Grid>
  </Grid>
);

export default Fields;
