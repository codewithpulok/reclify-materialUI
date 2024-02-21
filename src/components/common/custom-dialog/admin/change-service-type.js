import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useUpdateSellerMutation } from 'src/redux-toolkit/services/adminApi';
import ConfirmDialog from '../confirm-dialog';

const Props = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  serviceType: PropTypes.string,
  id: PropTypes.string,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ChangeServiceTypeDialog = (props) => {
  const { onClose, open, serviceType, id } = props;

  // api state
  const [updateSeller, updateResponse] = useUpdateSellerMutation();

  // handle confirm
  const handleConfirm = useCallback(async () => {
    console.log('Update Service Type: ', { serviceType, id });
    const response = await updateSeller({ id, data: { serviceType } });
    const { data, error } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in update service type!', { variant: 'error' });
      console.error('Error in update service type', response);
    }
    // handle success state
    else if (!error || data?.success) {
      enqueueSnackbar('Updated service type!');
      console.warn('Updated service type!', response);
      onClose();
    }
  }, [id, onClose, serviceType, updateSeller]);

  return (
    <ConfirmDialog
      onClose={onClose}
      open={open}
      title="Change Service Type?"
      content="Are you sure to update the service type for this seller? this will replace his existing service"
      action={
        <LoadingButton
          loading={updateResponse.isLoading}
          onClick={handleConfirm}
          color="primary"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

ChangeServiceTypeDialog.propTypes = Props;

export default ChangeServiceTypeDialog;
