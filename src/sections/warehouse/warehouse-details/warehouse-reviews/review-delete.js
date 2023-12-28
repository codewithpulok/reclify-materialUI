import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';

const ReviewDeleteProps = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {Review | undefined} */
  review: PropTypes.object,
};

/**
 * @param {ReviewDeleteProps} props
 * @returns {JSX.Element}
 */
const ReviewDelete = (props) => {
  const { open, review, onClose } = props;
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteReview = useCallback(() => {
    console.log('Delete review: ', review);
    enqueueSnackbar('Review Deleted');
    onClose();
  }, [enqueueSnackbar, onClose, review]);

  return (
    <ConfirmDialog
      title="Delete Review!"
      content="Are you sure? because this task cannot be undone."
      open={open}
      onClose={onClose}
      action={
        <Button variant="contained" color="primary" onClick={handleDeleteReview}>
          Confirm
        </Button>
      }
    />
  );
};

ReviewDelete.propTypes = ReviewDeleteProps;

export default ReviewDelete;
