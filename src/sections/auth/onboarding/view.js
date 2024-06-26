'use client';

import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLogoutMutation } from 'src/redux-toolkit/services/authApi';
import { paths } from 'src/routes/paths';
import OnboardingForm from './onboarding-form';
import OnboardingStatus from './onboarding-status';

const OnboardingView = () => {
  const { user } = useAppSelector(selectAuth);

  const showStatus =
    user?.stripeAccountStatus === 'PENDING' || user?.stripeAccountStatus === 'SUCCEDED';
  const showLogout = user?.stripeAccountStatus !== 'SUCCEDED';

  // router state
  const router = useRouter();

  // api state
  const [logout, logoutResponse] = useLogoutMutation();

  // handle logout function
  const handleLogout = async () => {
    router.replace(paths.auth.login);
    logout();
  };

  return (
    <Stack maxWidth={800} width="100%" alignItems="center">
      {showStatus ? <OnboardingStatus /> : <OnboardingForm />}

      <Stack spacing={1} mt={5}>
        {showLogout && (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography>Something went to wrong?</Typography>
            <LoadingButton
              variant="soft"
              color="error"
              onClick={handleLogout}
              loading={logoutResponse.isLoading}
            >
              Log out
            </LoadingButton>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default OnboardingView;
