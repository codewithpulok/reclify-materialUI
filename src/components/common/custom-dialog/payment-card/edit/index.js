import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { PaymentCardEditForm } from 'src/components/common/custom-form';
import { useCardUpdateMutation } from 'src/redux-toolkit/services/cardApi';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {PaymentCard | undefined} */
  card: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PayemntCardEditDialog = (props) => {
  const { open, onClose, card } = props;

  // api state
  const [updateCard, updateResponse] = useCardUpdateMutation();

  // handle update api call
  const handleSubmit = useCallback(
    async (values, reset) => {
      console.log('Update Payment Card:', values);

      const response = await updateCard({
        id: card?.id,
        data: values,
      });
      const { data, error } = response;

      // error state
      if (error || data?.isError) {
        console.log('Error in updating Payment Card:', response);
        enqueueSnackbar('Error in updating Payment Card!', { variant: 'error' });
      }

      // success state
      else if (data?.success) {
        enqueueSnackbar('Payment Card updated!');
        console.log('Payment Card updated:', response);
        reset(); // reset form after update success
        onClose();
      }
    },
    [card?.id, onClose, updateCard]
  );

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Edit Card</DialogTitle>
      <PaymentCardEditForm
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
              Update
            </LoadingButton>
          </DialogActions>
        }
        card={card}
        submitCallback={handleSubmit}
      />
    </Dialog>
  );
};

PayemntCardEditDialog.propTypes = Props;

export default PayemntCardEditDialog;
