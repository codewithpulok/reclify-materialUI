import { LoadingButton } from '@mui/lab';
import { Alert, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useCreateContactMutation } from 'src/redux-toolkit/services/contactApi';
import { joinAddressObj } from 'src/utils/address';

/**
 * @param {NotVerifiedAlert.propTypes} props
 * @returns {JSX.Element}
 */
const NotVerifiedAlert = (props) => {
  const { warehouse } = props;
  const { user } = useAppSelector(selectAuth);

  const [createContact, contactResponse] = useCreateContactMutation();

  // ACTIONS ----------------------------------------------------------------------

  const handleVerify = async () => {
    if (!user?.email || !warehouse) {
      enqueueSnackbar('Invalid data for warehouse verification.', { variant: 'error' });
      return;
    }

    const response = await createContact({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      subject: 'Verfification Request',
      message: `
      Warehouse Name: ${warehouse.name}
      Address: ${joinAddressObj(warehouse?.address || {})}
      `,
    });

    // handle error states
    if (response.error) {
      enqueueSnackbar('Could not request for warehouse verification.', { variant: 'error' });
    }

    // handle success state
    else if (response.data) {
      enqueueSnackbar('Warehouse Verification Request Sent');
    }
  };

  return (
    <Alert sx={{ mb: 2 }} icon={false} severity="warning">
      <Typography variant="inherit" mb={1}>
        Verification is required to sell space on Racklify. You may still list space and pricing for
        sale, however, checkout will be disabled.
      </Typography>
      <LoadingButton
        loading={contactResponse.isLoading}
        variant="soft"
        color="warning"
        size="small"
        onClick={handleVerify}
      >
        Verify
      </LoadingButton>
    </Alert>
  );
};

NotVerifiedAlert.propTypes = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object,
};

export default NotVerifiedAlert;
