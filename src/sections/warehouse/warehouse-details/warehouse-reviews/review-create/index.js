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
import { useSnackbar } from 'notistack';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { ICONS } from 'src/sections/warehouse/config-warehouse';
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

const ReviewCreateProps = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
/**
 * @param {ReviewCreateProps} props
 * @returns {JSX.Element}
 */
const ReviewCreate = (props) => {
  const { onClose, open } = props;
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({ defaultValues, resolver: yupResolver(reviewCreateSchema) });
  const { handleSubmit, reset } = methods;

  const onSubmit = (values) => {
    console.log('Create Review: ', values);
    enqueueSnackbar('Review Created');
    onClose();
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
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

ReviewCreate.propTypes = ReviewCreateProps;

export default ReviewCreate;
