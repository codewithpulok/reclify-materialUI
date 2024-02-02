import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// local components
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useReviewUpdateMutation } from 'src/redux-toolkit/services/reviewApi';
import { ICONS } from 'src/sections/private/dashboard/warehouses/config-warehouse';
import ReviewEditFields from './fields';

const reviewEditSchema = Yup.object().shape({
  feedback: Yup.string().required('Feedback is required'),
  rating: Yup.number()
    .min(1, 'Minimum 1 star is required')
    .max(5, 'Maximum 5 star is allowed')
    .required('Rating is required'),
});

const defaultValues = {
  feedback: '',
  rating: 0,
};

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  review: PropTypes.object,
  warehouseId: PropTypes.string,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ReviewEdit = (props) => {
  const { onClose, open, review, warehouseId } = props;

  const methods = useForm({ defaultValues, resolver: yupResolver(reviewEditSchema) });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting } = formState;

  const [updateReview] = useReviewUpdateMutation();

  const onSubmit = async (values) => {
    console.log('Update Review: ', values);

    const response = await updateReview({
      id: review.id,
      data: { ...review, ...values, warehouseId },
    });
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.error('Error in update review', response);
      enqueueSnackbar('Error in update review', { variant: 'error' });
    }
    // success state
    else if (data?.success) {
      console.warn('Review updated', response);
      enqueueSnackbar('Review updated');
      reset(defaultValues);
      onClose();
    }
  };

  const onReset = () => {
    onClose();
    reset(defaultValues);
  };

  useEffect(() => {
    const changes = {};

    if (review?.feedback) changes.feedback = review.feedback;
    if (review?.rating) changes.rating = review.rating;

    reset(changes);
  }, [reset, review]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        Edit Review
        <IconButton onClick={onClose}>{ICONS.close()}</IconButton>
      </DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <ReviewEditFields />
        </DialogContent>
        <DialogActions>
          <Button type="button" color="error" onClick={onReset}>
            Cancel
          </Button>
          <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="primary">
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

ReviewEdit.propTypes = Props;

export default ReviewEdit;
