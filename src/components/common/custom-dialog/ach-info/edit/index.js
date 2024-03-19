import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ACHInfoEditForm } from 'src/components/common/custom-form';
import { useAchUpdateMutation } from 'src/redux-toolkit/services/achApi';

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
  const [updateAch, updateResponse] = useAchUpdateMutation();

  // handle update api call
  const handleSubmit = useCallback(
    async (values, reset) => {
      console.log('Update ACH Info:', values);

      const response = await updateAch({ id: ach?.id, data: values });
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
        onClose();
      }
    },
    [ach?.id, onClose, updateAch]
  );

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
              loading={updateResponse.isLoading}
              type="submit"
              color="primary"
              variant="contained"
            >
              Update
            </LoadingButton>
          </DialogActions>
        }
        ach={ach}
        submitCallback={handleSubmit}
      />
    </Dialog>
  );
};

ACHInfoEditDialog.propTypes = Props;

export default ACHInfoEditDialog;
