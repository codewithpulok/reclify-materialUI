import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// local components
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useReviewCreateMutation } from 'src/redux-toolkit/services/reviewApi';
import { ICONS } from 'src/sections/private/dashboard/warehouses/config-warehouse';
import ReviewCreateFields from './fields';

const reviewCreateSchema = Yup.object().shape({
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
  warehouseId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ReviewCreate = (props) => {
  const { onClose, open, warehouseId } = props;

  const methods = useForm({ defaultValues, resolver: yupResolver(reviewCreateSchema) });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting } = formState;

  const [createReview] = useReviewCreateMutation();

  const onSubmit = async (values) => {
    console.log('Create Review: ', values);

    const response = await createReview({ ...values, warehouseId });
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.error('Error in create review', response);
      enqueueSnackbar('Error in create review', { variant: 'error' });
    }
    // success state
    else if (data?.success) {
      console.warn('Review created', response);
      enqueueSnackbar('Review Created');
      reset(defaultValues);
      onClose();
    }
  };

  const onReset = () => {
    onClose();
    reset(defaultValues);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        Add Review
        <IconButton onClick={onClose}>{ICONS.close()}</IconButton>
      </DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <ReviewCreateFields />
        </DialogContent>
        <DialogActions>
          <Button type="button" color="error" onClick={onReset}>
            Cancel
          </Button>
          <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="primary">
            Create
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

ReviewCreate.propTypes = Props;

export default ReviewCreate;
