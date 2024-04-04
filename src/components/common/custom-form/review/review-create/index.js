import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

// local components
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useReviewCreateMutation } from 'src/redux-toolkit/services/reviewApi';

import CreateFields from './fields';
import createSchema from './schema';

const defaultValues = {
  feedback: '',
  rating: 0,
};

/**
 * @param {ReviewCreate.propTypes} props
 * @returns {JSX.Element}
 */
const ReviewCreate = (props) => {
  const { refData, errorCallback, successCallback, resetCallback, actionWrapper, contentWrapper } =
    props;

  // FORM STATES ----------------------------------------------------------------------
  const methods = useForm({ defaultValues, resolver: yupResolver(createSchema) });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting } = formState;

  // API STATE ----------------------------------------------------------------------
  const [createReview] = useReviewCreateMutation();

  // ACTIONS ----------------------------------------------------------------------

  const onSubmit = async (values) => {
    console.log('Create Review: ', values);

    const response = await createReview({ ...values, warehouseId: refData.warehouseId });
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.error('Error in create review', response);
      enqueueSnackbar('Error in create review', { variant: 'error' });
      errorCallback();
    }
    // success state
    else if (data?.success) {
      console.warn('Review created', response);
      enqueueSnackbar('Review Created');
      reset(defaultValues);
      successCallback();
    }
  };

  const onReset = () => {
    resetCallback();
    reset(defaultValues);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box component={contentWrapper}>
        <CreateFields />
      </Box>

      <Box component={actionWrapper}>
        <Button type="button" color="error" onClick={onReset}>
          Cancel
        </Button>
        <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="primary">
          Create
        </LoadingButton>
      </Box>
    </FormProvider>
  );
};

ReviewCreate.propTypes = {
  successCallback: PropTypes.func,
  errorCallback: PropTypes.func,
  resetCallback: PropTypes.func,
  refData: {
    warehouseId: PropTypes.string,
  },

  actionWrapper: PropTypes.elementType,
  contentWrapper: PropTypes.elementType,
};

export default ReviewCreate;
