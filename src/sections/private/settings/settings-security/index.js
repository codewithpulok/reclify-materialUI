import { Stack } from '@mui/material';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import KYC from './kyc';
import ResetPassword from './reset-password';

// ----------------------------------------------------------------------

const SettingsSecurity = () => {
  // auth state
  const { user } = useAppSelector(selectAuth);

  return (
    <Stack spacing={3}>
      <ResetPassword />
      {['seller', 'customer'].includes(user?.userType) && <KYC />}
    </Stack>
  );
};

export default SettingsSecurity;
