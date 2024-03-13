import { Alert, AlertTitle, Button } from '@mui/material';
import Iconify from 'src/components/common/iconify';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const OnboardingStatus = (props) => {
  const { user } = useAppSelector(selectAuth);

  if (user.stripeAccountStatus === 'NOT_SENT') {
    return (
      <Alert
        sx={{ width: '100%' }}
        severity="warning"
        action={
          <Button
            LinkComponent={RouterLink}
            color="warning"
            variant="contained"
            href={paths.auth.onboarding}
            endIcon={<Iconify icon="solar:arrow-right-line-duotone" width={18} />}
            size="small"
          >
            Start
          </Button>
        }
      >
        <AlertTitle>Onboarding Not Started Yet</AlertTitle>
        Complete account onboarding to access all the features
      </Alert>
    );
  }

  if (user.stripeAccountStatus === 'PENDING') {
    return (
      <Alert sx={{ width: '100%' }} severity="info">
        <AlertTitle>Onboarding Started</AlertTitle>
        We are checking your submitted onboarding data. Once it is complete we will let you know.
      </Alert>
    );
  }

  if (user.stripeAccountStatus === 'FAILED') {
    return (
      <Alert
        sx={{ width: '100%' }}
        severity="error"
        action={
          <Button
            LinkComponent={RouterLink}
            color="error"
            variant="outlined"
            href={paths.auth.onboarding}
            endIcon={<Iconify icon="solar:arrow-right-line-duotone" width={18} />}
            size="small"
          >
            Visit
          </Button>
        }
      >
        <AlertTitle>Onboarding Failed</AlertTitle>
        Look like there is some error in your submitted onboarding data. For detailed information
        visit onboarding page.
      </Alert>
    );
  }

  if (user.stripeAccountStatus === 'SUCCEDED') {
    return (
      <Alert sx={{ width: '100%' }} severity="success">
        <AlertTitle>Onboarding Completed</AlertTitle>
        You have successfully completed the onboarding step. You can now continue using Racklify.
      </Alert>
    );
  }

  return null;
};

OnboardingStatus.propTypes = {};

export default OnboardingStatus;
