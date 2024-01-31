import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { useBillingInfoDeleteMutation } from 'src/redux-toolkit/services/billingInfoApi';

const Props = {
  /** @type {BillingAddress | undefined} */
  billingAddress: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingAddressDeleteDialog = (props) => {
  const {
    // required props
    open,
    onClose,
    billingAddress,
    // optional props
    sx = {},
  } = props;

  // api state
  const [deleteBillingInfo, deleteResponse] = useBillingInfoDeleteMutation();

  // handle delete
  const onConfirm = useCallback(async () => {
    console.log('Delete Billing Info:', billingAddress);

    const response = await deleteBillingInfo(billingAddress?.id);
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.log('Error in deleting billing info:', response);
      enqueueSnackbar('Error in deleting billing info!', { variant: 'error' });
    }

    // success state
    else if (data?.success) {
      enqueueSnackbar('Billing info deleted!');
      console.log('Billing info deleted:', response);
      onClose(); // close dialog after delete success
    }
  }, [billingAddress, deleteBillingInfo, onClose]);

  return (
    <ConfirmDialog
      title="Delete billing address"
      content="Are you sure to delete? because it cannot be undone."
      open={open}
      onClose={onClose}
      action={
        <LoadingButton
          loading={deleteResponse.isLoading}
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Confirm
        </LoadingButton>
      }
      sx={sx}
    />
  );
};

BillingAddressDeleteDialog.propTypes = Props;

export default BillingAddressDeleteDialog;
