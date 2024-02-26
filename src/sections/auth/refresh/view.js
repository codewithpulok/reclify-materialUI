'use client';

import { LoadingButton } from '@mui/lab';
import { Alert, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { RefreshIcon } from 'src/assets/icons';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLogoutMutation } from 'src/redux-toolkit/services/authApi';
import { useLazyRefreshAccountQuery } from 'src/redux-toolkit/services/paymentApi';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

const RefreshView = (props) => {
  const { user } = useAppSelector(selectAuth);
  const router = useRouter();

  // api state
  const [refreshAccount, refreshResponse] = useLazyRefreshAccountQuery();
  const [logout, logoutResponse] = useLogoutMutation();

  const showError =
    !refreshResponse?.isLoading && !refreshResponse?.isFetching && refreshResponse?.isError;
  const showSuccess =
    !refreshResponse?.isLoading && !refreshResponse?.isFetching && refreshResponse?.isSuccess;
  const showLoading = refreshResponse?.isLoading || refreshResponse?.isFetching;

  // refresh account on button click
  const handleRefreshAccount = useCallback(async () => {
    if (!user?.id) return;

    await refreshAccount();
  }, [refreshAccount, user]);

  // handle logout function
  const handleLogout = async () => {
    await logout();
    router.replace(paths.auth.login);
  };

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      <RefreshIcon />

      {showError && (
        <Alert severity="error" sx={{ width: 1 }}>
          Error in refresh URL
        </Alert>
      )}

      {showSuccess && (
        <>
          <Alert severity="success">
            URL refreshed successfully. click bellow to complete your account linking with stripe
          </Alert>

          <Button
            color="success"
            variant="contained"
            LinkComponent={RouterLink}
            href={refreshResponse?.data?.results?.url}
            fullWidth
            size="large"
          >
            Complete Account Linking
          </Button>
        </>
      )}

      {!showSuccess && (
        <>
          <LoadingButton
            loading={showLoading}
            onClick={handleRefreshAccount}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
          >
            {showError ? 'Try again' : 'Refresh Account Link'}
          </LoadingButton>
          <LoadingButton
            loading={logoutResponse.isLoading}
            color="error"
            onClick={handleLogout}
            fullWidth
          >
            Log out
          </LoadingButton>
        </>
      )}
    </Stack>
  );
};

RefreshView.propTypes = {};

export default RefreshView;
