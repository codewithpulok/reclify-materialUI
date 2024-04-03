import { Stack, Typography } from '@mui/material';
import KYCForm from './kyc-form';

const KYCView = (props) => (
  <Stack maxWidth={800} width="100%" alignItems="center">
    <Typography variant="h3">Complete KYC</Typography>
    <Typography variant="body2" color="text.secondary">
      to access all the features of racklify you need to complete KYC
    </Typography>

    <KYCForm />
  </Stack>
);

KYCView.propTypes = {};

export default KYCView;
