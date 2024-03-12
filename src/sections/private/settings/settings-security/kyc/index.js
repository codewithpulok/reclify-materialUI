import { Button, Card, CardContent, CardHeader } from '@mui/material';

const KYC = () => (
  <Card>
    <CardHeader title="Identity Verification" />
    <CardContent>
      <Button color="primary" variant="contained">
        Start identity verification
      </Button>
    </CardContent>
  </Card>
);

export default KYC;
