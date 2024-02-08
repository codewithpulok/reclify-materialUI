import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { BillingInfoEditForm } from 'src/components/common/custom-form';
import { useBillingInfoUpdateMutation } from 'src/redux-toolkit/services/billingInfoApi';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {BillingAddress | undefined} */
  billingAddress: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingAddressEditDialog = (props) => {
  const { open, onClose, billingAddress } = props;

  // api state
  const [updateBillingInfo, updateResponse] = useBillingInfoUpdateMutation();

  // handle update api call
  const handleSubmit = useCallback(
    async (values, reset) => {
      console.log('Update Billing Info:', values);

      const response = await updateBillingInfo({ id: billingAddress?.id, data: values });
      const { data, error } = response;

      // error state
      if (error || data?.isError) {
        console.log('Error in updating billing info:', response);
        enqueueSnackbar('Error in updating billing info!', { variant: 'error' });
      }

      // success state
      else if (data?.success) {
        enqueueSnackbar('Billing info updated!');
        console.log('Billing info updated:', response);
        reset(); // reset form after success create
        onClose();
      }
    },
    [billingAddress?.id, onClose, updateBillingInfo]
  );

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Edit Billing Address</DialogTitle>
      <BillingInfoEditForm
        wrapperElement={DialogContent}
        actions={
          <DialogActions>
            <Button type="reset" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={updateResponse.isLoading}
              type="submit"
              color="primary"
              variant="contained"
            >
              Edit
            </LoadingButton>
          </DialogActions>
        }
        billingAddress={billingAddress}
        submitCallback={handleSubmit}
      />
    </Dialog>
  );
};

BillingAddressEditDialog.propTypes = Props;

export default BillingAddressEditDialog;
