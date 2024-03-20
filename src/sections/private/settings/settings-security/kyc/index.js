import { Button, Card, CardContent, CardHeader } from '@mui/material';

const KYC = () => (
  <Card>
    <CardHeader title="Identity Verification" />
    <CardContent>
      <Button color="primary" variant="contained">
        Start Identity Verification
      </Button>
    </CardContent>
  </Card>
);

export default KYC;
