'use client';

import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useCreateContactMutation } from 'src/redux-toolkit/services/contactApi';

const VerifyBtn = (props) => {
  const { isAuthenticated, user } = useAppSelector(selectAuth);

  const [createContact, createResponse] = useCreateContactMutation();

  // ACTIONS ----------------------------------------------------------------------

  const handleVerify = async () => {
    if (!user?.email) {
      enqueueSnackbar('Invalid data for verification.', { variant: 'error' });
      return;
    }

    const response = await createContact({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      subject: 'Verfification Request',
      message: `
        ID: ${user?.id}
        Name: ${user?.firstName} ${user?.lastName}
        Current Plan: ${user?.planId}
        `,
    });

    // handle error states
    if (response.error) {
      enqueueSnackbar('Could not request for verification.', { variant: 'error' });
    }

    // handle success state
    else if (response.data) {
      enqueueSnackbar('Verification Request Sent');
    }
  };

  if (!isAuthenticated || !user?.id) return null;

  return (
    <LoadingButton
      onClick={handleVerify}
      loading={createResponse.isLoading}
      size="small"
      color="primary"
      variant="soft"
      sx={{ ml: 'auto' }}
    >
      Verify
    </LoadingButton>
  );
};

VerifyBtn.propTypes = {};

export default VerifyBtn;
