import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { useAchDeleteMutation } from 'src/redux-toolkit/services/achApi';

const Props = {
  /** @type {ACHType} */
  ach: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ACHInfoDeleteDialog = (props) => {
  const {
    // required props
    open,
    onClose,
    ach,
    // optional props
    sx = {},
  } = props;

  // api state
  const [deleteAch, deleteResponse] = useAchDeleteMutation();

  // handle delete
  const onConfirm = useCallback(async () => {
    console.log('Delete ACH Info:', ach);

    const response = await deleteAch(ach?.id);
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.log('Error in deleting ACH Info:', response);
      enqueueSnackbar('Error in deleting ACH Info!', { variant: 'error' });
    }

    // success state
    else if (data?.success) {
      enqueueSnackbar('ACH Info deleted!');
      console.log('ACH Info deleted:', response);
      onClose(); // close dialog after delete success
    }
  }, [ach, deleteAch, onClose]);

  return (
    <ConfirmDialog
      title="Delete ACH Info"
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

ACHInfoDeleteDialog.propTypes = Props;

export default ACHInfoDeleteDialog;
