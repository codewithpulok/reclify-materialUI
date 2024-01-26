import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useWarehouseDeleteMutation } from 'src/redux-toolkit/services/warehouseApi';
import ConfirmDialog from '../confirm-dialog';

const Props = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  /** @type {Warehouse} */
  warehouse: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseDeleteDialog = (props) => {
  const { onClose, open, warehouse } = props;

  const [deleteWarehouse, deleteResponse] = useWarehouseDeleteMutation();

  const handleCancelTransaction = useCallback(async () => {
    console.log('Cancel Transaction: ', warehouse);
    const response = await deleteWarehouse(warehouse?.id);
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in deleting warehouse', { variant: 'error' });
      console.error('Warehouse delete error: ', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Warehouse deleted successfully');
      console.warn('Warehouse deleted successfully', response);
      onClose();
    }
  }, [deleteWarehouse, onClose, warehouse]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Delete Warehouse!"
      content="Are you sure to delete this warehouse? After deleting warehouse, it cannot be undone."
      action={
        <LoadingButton
          loading={deleteResponse?.isLoading}
          onClick={handleCancelTransaction}
          color="error"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

WarehouseDeleteDialog.propTypes = Props;

export default WarehouseDeleteDialog;
