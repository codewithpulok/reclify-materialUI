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
import { useSnackbar } from 'notistack';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { ICONS } from 'src/sections/warehouse/config-warehouse';
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

const ReviewEditProps = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};
/**
 * @param {ReviewEditProps} props
 * @returns {JSX.Element}
 */
const ReviewEdit = (props) => {
  const { onClose, open, review } = props;
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({ defaultValues, resolver: yupResolver(reviewEditSchema) });
  const { handleSubmit, reset } = methods;

  const onSubmit = (values) => {
    console.log('Edit Review: ', values);
    enqueueSnackbar('Review Edited');
    onClose();
  };

  const onReset = () => {
    onClose();
    reset(defaultValues);
  };

  useEffect(() => {
    const changes = {};

    if (review.feedback) changes.feedback = review.feedback;
    if (review.rating) changes.rating = review.rating;

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
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

ReviewEdit.propTypes = ReviewEditProps;

export default ReviewEdit;
