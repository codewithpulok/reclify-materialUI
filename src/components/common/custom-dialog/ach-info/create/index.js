import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { ACHInfoCreateForm } from 'src/components/common/custom-form';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ACHInfoCreateDialog = (props) => {
  const { open, onClose } = props;

  // api state
  // const [createCard, createResponse] = useCardCreateMutation();

  // handle create api call
  const handleSubmit = async (values, reset) => {
    console.log('Create ACH Info:', values);

    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { success: true } });
      }, 1000);
    });
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.log('Error in creating ACH Info:', response);
      enqueueSnackbar('Error in creating ACH Info!', { variant: 'error' });
    }

    // success state
    else if (data?.success) {
      enqueueSnackbar('ACH Info created!');
      console.log('ACH Info created:', response);
      reset(); // reset form after success create
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>New ACH Info</DialogTitle>
      <ACHInfoCreateForm
        wrapperElement={DialogContent}
        actions={
          <DialogActions>
            <Button type="reset" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              // loading={createResponse.isLoading}
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

ACHInfoCreateDialog.propTypes = Props;

export default ACHInfoCreateDialog;
