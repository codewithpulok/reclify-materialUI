import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
// local components
import { ReviewEditForm } from '../../custom-form';

/**
 * @param {ReviewEdit.propTypes} props
 * @returns {JSX.Element}
 */
const ReviewEdit = (props) => {
  const { onClose, open, review, warehouseId } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit Review</DialogTitle>

      <ReviewEditForm
        resetCallback={onClose}
        successCallback={onClose}
        errorCallback={onClose}
        actionWrapper={DialogActions}
        contentWrapper={DialogContent}
        refData={{
          warehouseId,
          review,
        }}
      />
    </Dialog>
  );
};

ReviewEdit.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  review: PropTypes.object,
  warehouseId: PropTypes.string,
};

export default ReviewEdit;
