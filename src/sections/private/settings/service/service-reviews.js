import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { EmptyState } from 'src/components/common/custom-state';
import { RHFAccordion } from 'src/components/common/hook-form';
import { WarehouseReviewCard } from 'src/components/warehouse/cards';
import { useAddressGoogleReviewsMutation } from 'src/redux-toolkit/services/addressApi';
import { checkValidAddress, joinAddressObj } from 'src/utils/address';
import { ICONS } from '../config-settings';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceReviews = (props) => {
  // api state
  const [getReviews, reviewsResponse] = useAddressGoogleReviewsMutation();

  // form state
  const { watch, setValue } = useFormContext();
  const address = watch('address');
  const name = watch('name', undefined);
  const reviews = watch('reviews', []);

  // conditional state
  const isImportable = checkValidAddress(
    address,
    typeof name === 'string' && name.trim()?.length > 0
  );

  // fetch reviews
  const getReviewsHandler = useCallback(async () => {
    const response = await getReviews(joinAddressObj(address, name));
    const { data, error } = response;

    // handle error state
    if (error || data.isError) {
      enqueueSnackbar(error?.data?.message || 'Error in importing reviews', { variant: 'error' });
      console.error('Error: Import Reviews', response);
    }
    // handle success state
    else if (data.success) {
      enqueueSnackbar('Successfully imported reviews');
      console.warn('Reviews Imported:', response);
      setValue('reviews', data?.results || []);
    }
  }, [address, getReviews, name, setValue]);

  return (
    <Stack alignItems="end">
      <LoadingButton
        disabled={!isImportable}
        variant="outlined"
        size="small"
        sx={{ mb: 1, ml: 'auto' }}
        endIcon={ICONS.import()}
        onClick={getReviewsHandler}
        loading={reviewsResponse.isLoading}
      >
        Import Google Reviews
      </LoadingButton>
      <RHFAccordion label="Reviews" defaultExpanded name="reviews" sx={{ width: 1 }}>
        {reviews?.length ? (
          <Stack spacing={3.5}>
            {reviews.map((review) => (
              <WarehouseReviewCard
                key={review.id}
                avatar={review.userData?.avatar}
                createdAt={review?.createdAt}
                feedback={review.feedback}
                name={`${review.userData?.firstName} ${review.userData?.lastName}`}
                rating={review.rating}
              />
            ))}
          </Stack>
        ) : (
          <EmptyState icon={ICONS.review()} text="no reviews yet" />
        )}
      </RHFAccordion>
    </Stack>
  );
};

ServiceReviews.propTypes = Props;

export default ServiceReviews;
