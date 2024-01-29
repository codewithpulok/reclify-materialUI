import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { PaymentCardCreateForm } from 'src/components/common/custom-form';
import { useCardCreateMutation } from 'src/redux-toolkit/services/cardApi';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PayemntCardCreateDialog = (props) => {
  const { open, onClose } = props;

  // api state
  const [createCard, createResponse] = useCardCreateMutation();

  // handle create api call
  const handleSubmit = async (values, reset) => {
    console.log('Create Payment Card:', values);

    const response = await createCard(values);
    const { data, error } = response;

    // error state
    if (error || !data?.isError) {
      console.log('Error in creating Payment Card:', response);
      enqueueSnackbar('Error in creating Payment Card!', { variant: 'error' });
    }

    // success state
    else if (data?.success) {
      enqueueSnackbar('Payment Card created!');
      console.log('Payment Card created:', response);
      reset(); // reset form after success create
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>New Card</DialogTitle>
      <PaymentCardCreateForm
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

PayemntCardCreateDialog.propTypes = Props;

export default PayemntCardCreateDialog;
