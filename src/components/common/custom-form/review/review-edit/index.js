import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

// local components
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useReviewUpdateMutation } from 'src/redux-toolkit/services/reviewApi';
import EditFields from './fields';
import editSchema from './schema';

/**
 * @param {ReviewEdit.propTypes} props
 * @returns {JSX.Element}
 */
const ReviewEdit = (props) => {
  const { actionWrapper, contentWrapper, errorCallback, refData, resetCallback, successCallback } =
    props;

  // Form Sates ----------------------------------------------------------------------
  const defaultValues = useMemo(
    () => ({
      feedback: '' || refData?.review?.feedback,
      rating: 0 || refData?.review?.rating,
    }),
    [refData?.review?.feedback, refData?.review?.rating]
  );
  const methods = useForm({ defaultValues, resolver: yupResolver(editSchema) });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting } = formState;

  // API SATES ----------------------------------------------------------------------
  const [updateReview] = useReviewUpdateMutation();

  // ACTIONS ----------------------------------------------------------------------
  const onSubmit = async (values) => {
    console.log('Update Review: ', values);

    const response = await updateReview({
      id: refData?.review?.id,
      data: { ...refData?.review, ...values, warehouseId: refData?.warehouseId },
    });
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.error('Error in update review', response);
      enqueueSnackbar('Error in update review', { variant: 'error' });
      errorCallback();
    }
    // success state
    else if (data?.success) {
      console.warn('Review updated', response);
      enqueueSnackbar('Review updated');
      reset(defaultValues);
      successCallback();
    }
  };

  const onReset = () => {
    resetCallback();
    reset(defaultValues);
  };

  // Update the default values
  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box component={contentWrapper}>
        <EditFields />
      </Box>
      <Box component={actionWrapper}>
        <Button type="button" color="error" onClick={onReset}>
          Cancel
        </Button>
        <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="primary">
          Update
        </LoadingButton>
      </Box>
    </FormProvider>
  );
};

ReviewEdit.propTypes = {
  successCallback: PropTypes.func,
  errorCallback: PropTypes.func,
  resetCallback: PropTypes.func,
  refData: {
    warehouseId: PropTypes.string,
    /** @type {Review} */
    review: PropTypes.object,
  },

  actionWrapper: PropTypes.elementType,
  contentWrapper: PropTypes.elementType,
};

export default ReviewEdit;
