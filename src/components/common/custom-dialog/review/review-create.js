import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
// local components
import { ReviewCreateForm } from '../../custom-form';

/**
 * @param {ReviewCreate.propTypes} props
 * @returns {JSX.Element}
 */
const ReviewCreate = (props) => {
  const { onClose, open, warehouseId } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Review</DialogTitle>

      <ReviewCreateForm
        actionWrapper={DialogActions}
        contentWrapper={DialogContent}
        errorCallback={onClose}
        resetCallback={onClose}
        successCallback={onClose}
        refData={{ warehouseId }}
      />
    </Dialog>
  );
};

ReviewCreate.propTypes = {
  warehouseId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewCreate;
