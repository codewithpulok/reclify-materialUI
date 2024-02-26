'use client';

import { Alert, Button, CircularProgress, Link, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { RefreshIcon } from 'src/assets/icons';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLazyRefreshAccountQuery } from 'src/redux-toolkit/services/paymentApi';
import { RouterLink } from 'src/routes/components';

const RefreshView = (props) => {
  const { user } = useAppSelector(selectAuth);

  // api state
  const [refreshAccount, refreshResponse] = useLazyRefreshAccountQuery();

  const showError =
    !refreshResponse?.isLoading && !refreshResponse?.isFetching && refreshResponse?.isError;
  const showSuccess =
    !refreshResponse?.isLoading && !refreshResponse?.isFetching && refreshResponse?.isSuccess;
  const showLoading = refreshResponse?.isLoading || refreshResponse?.isFetching;

  // refresh account on button click
  const handleRefreshAccount = useCallback(async () => {
    if (!user?.id) return;

    await refreshAccount();
  }, [refreshAccount, user?.id]);

  if (showLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <CircularProgress color="primary" />
        <Typography variant="overline">refreshing link..</Typography>
      </Stack>
    );
  }

  if (showError) {
    return (
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Alert severity="error" sx={{ width: 1 }}>
          Error in refresh URL
        </Alert>
        <Button onClick={handleRefreshAccount} color="primary" variant="outlined">
          Try Again
        </Button>
      </Stack>
    );
  }

  if (showSuccess) {
    return (
      <Alert severity="success">
        URL refreshed successfully.{' '}
        <Link component={RouterLink} href="#">
          click here
        </Link>{' '}
        to redirect to the account link page
      </Alert>
    );
  }

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      <RefreshIcon />
      <Button onClick={handleRefreshAccount} color="primary" variant="outlined" size="large">
        Refresh Account Link
      </Button>
    </Stack>
  );
};

RefreshView.propTypes = {};

export default RefreshView;
