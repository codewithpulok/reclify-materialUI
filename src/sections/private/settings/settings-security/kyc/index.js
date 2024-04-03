import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const KYC = () => (
  <Card>
    <CardHeader title="Identity Verification" />
    <CardContent>
      <Button color="primary" variant="contained" LinkComponent={RouterLink} href={paths.auth.kyc}>
        Start Identity Verification
      </Button>
    </CardContent>
  </Card>
);

export default KYC;
