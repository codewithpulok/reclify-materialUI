import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import ConfirmDialog from '../confirm-dialog';

/**
 * @param {AdditionalFeeDialog.propTypes} props
 * @returns {JSX.Element}
 */
const AdditionalFeeDialog = (props) => {
  const { open, onClose, onSuccess } = props;

  // Actions ----------------------------------------------------------------------

  const handleConfirm = () => {
    onClose();
    onSuccess();
  };

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Confirm Additional Fee"
      content="Additional warehouse location fees ($20/warehouse/month) will apply."
      action={
        <LoadingButton onClick={handleConfirm} color="primary" variant="contained">
          Confirm
        </LoadingButton>
      }
    />
  );
};

AdditionalFeeDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onSuccess: PropTypes.func,
};

export default AdditionalFeeDialog;
