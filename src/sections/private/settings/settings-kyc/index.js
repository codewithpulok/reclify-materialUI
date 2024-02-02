import { Button, Card, Stack } from '@mui/material';

const SettingsKyc = () => (
  <Stack component={Card} spacing={3} sx={{ p: 3 }}>
    <Button color="primary" variant='contained'>Start KYC</Button>
  </Stack>
);

export default SettingsKyc;
