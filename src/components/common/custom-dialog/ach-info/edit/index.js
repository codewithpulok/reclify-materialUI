import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { ACHInfoEditForm } from 'src/components/common/custom-form';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {ACHType} */
  ach: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ACHInfoEditDialog = (props) => {
  const { open, onClose, ach } = props;

  // api state
  // const [updateCard, updateResponse] = useCardUpdateMutation();

  // handle update api call
  const handleSubmit = async (values, reset) => {
    console.log('Update ACH Info:', values);

    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { success: true } });
      }, 1000);
    });
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.log('Error in updating ACH Info:', response);
      enqueueSnackbar('Error in updating ACH Info!', { variant: 'error' });
    }

    // success state
    else if (data?.success) {
      enqueueSnackbar('ACH Info updated!');
      console.log('ACH Info updated:', response);
      reset(); // reset form after update success
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Edit ACH Info</DialogTitle>
      <ACHInfoEditForm
        wrapperElement={DialogContent}
        actions={
          <DialogActions>
            <Button type="reset" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              // loading={updateResponse.isLoading}
              type="submit"
              color="primary"
              variant="contained"
            >
              Update
            </LoadingButton>
          </DialogActions>
        }
        card={ach}
        submitCallback={handleSubmit}
      />
    </Dialog>
  );
};

ACHInfoEditDialog.propTypes = Props;

export default ACHInfoEditDialog;
