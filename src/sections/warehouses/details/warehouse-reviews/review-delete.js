import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { useReviewDeleteMutation } from 'src/redux-toolkit/services/reviewApi';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** @type {Review | undefined} */
  review: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ReviewDelete = (props) => {
  const { open, review, onClose } = props;

  const [deleteReview, { isLoading }] = useReviewDeleteMutation();

  const handleDeleteReview = useCallback(async () => {
    console.log('Delete review: ', review);

    const response = await deleteReview(review);
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.error('Error in delete review', response);
      enqueueSnackbar('Error in delete review', { variant: 'error' });
    }
    // success state
    else if (data?.isSuccess) {
      console.warn('Review deleted', response);
      enqueueSnackbar('Review deleted');
    }

    onClose();
  }, [deleteReview, onClose, review]);

  return (
    <ConfirmDialog
      title="Delete Review!"
      content="Are you sure? because this task cannot be undone."
      open={open}
      onClose={onClose}
      action={
        <LoadingButton
          loading={isLoading}
          variant="contained"
          color="primary"
          onClick={handleDeleteReview}
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

ReviewDelete.propTypes = Props;

export default ReviewDelete;
