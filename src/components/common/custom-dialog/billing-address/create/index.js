import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { BillingAddressCreateForm } from 'src/components/common/custom-form';
import { useBillingInfoCreateMutation } from 'src/redux-toolkit/services/billingInfoApi';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingAddressCreateDialog = (props) => {
  const { open, onClose } = props;

  // api state
  const [createBillingInfo, createResponse] = useBillingInfoCreateMutation();

  // handle create api call
  const handleSubmit = async (values, reset) => {
    console.log('Create Billing Info:', values);

    const response = await createBillingInfo(values);
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.log('Error in creating billing info:', response);
      enqueueSnackbar('Error in creating billing info!', { variant: 'error' });
    }

    // success state
    else if (data?.success) {
      enqueueSnackbar('Billing info created!');
      console.log('Billing info created:', response);
      reset(); // reset form after success create
      onClose();
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>New Billing Address</DialogTitle>
      <BillingAddressCreateForm
        wrapperElement={DialogContent}
        actions={
          <DialogActions>
            <Button type="reset" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={createResponse.isLoading}
              type="submit"
              color="primary"
              variant="contained"
            >
              Create
            </LoadingButton>
          </DialogActions>
        }
        submitCallback={handleSubmit}
      />
    </Dialog>
  );
};

BillingAddressCreateDialog.propTypes = Props;

export default BillingAddressCreateDialog;
