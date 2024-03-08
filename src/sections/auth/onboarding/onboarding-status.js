import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useInitAuthMutation } from 'src/redux-toolkit/services/authApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const titles = {
  SUCCEDED: 'Onboarding Successfully Completed',
  PENDING: 'Onboarding Proccess is Loading',
};

const texts = {
  SUCCEDED: 'You can now continue using Racklify.',
  PENDING: "Your onboarding is loading. Once we're done we'll let you know",
};

const OnboardingStatus = (props) => {
  const { user } = useAppSelector(selectAuth);

  const title = titles?.[user?.stripeAccountCompleteStatus];
  const text = texts?.[user?.stripeAccountCompleteStatus];
  const isSuccess = user?.stripeAccountCompleteStatus === 'SUCCEDED';
  const isPending = user?.stripeAccountCompleteStatus === 'PENDING';

  // api state
  const [refreshAuth, refreshResponse] = useInitAuthMutation();

  // head part
  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }}>
      <Typography variant="h3">Onboarding Status</Typography>
    </Stack>
  );

  return (
    <Stack maxWidth={600} width="100%">
      {false && renderHead}

      <Alert severity={isSuccess ? 'success' : 'info'} sx={{ mb: 2 }}>
        <AlertTitle sx={{ textAlign: 'left' }}>{title}</AlertTitle>
        <Typography sx={{ textAlign: 'left' }}>{text}</Typography>
      </Alert>
      <Stack>
        {isSuccess && (
          <Button LinkComponent={RouterLink} href={paths.dashboard.root} variant="outlined">
            Go to Dashboard
          </Button>
        )}

        {isPending && (
          <LoadingButton
            loading={refreshResponse.isLoading}
            onClick={refreshAuth}
            variant="outlined"
          >
            Refresh
          </LoadingButton>
        )}
      </Stack>
    </Stack>
  );
};

OnboardingStatus.propTypes = {};

export default OnboardingStatus;
