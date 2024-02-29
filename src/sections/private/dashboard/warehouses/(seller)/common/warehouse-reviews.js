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
import { ICONS } from '../../config-warehouse';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseReviews = (props) => {
  // api state
  const [getReviews, reviewsResponse] = useAddressGoogleReviewsMutation();

  // form state
  const { watch, setValue } = useFormContext();
  const address = watch('address');
  const reviews = watch('reviews', []);

  // conditional state
  const isImportable = checkValidAddress(address);

  // fetch reviews
  const getReviewsHandler = useCallback(async () => {
    const response = await getReviews(joinAddressObj(address));
    const { data, error } = response;

    // handle error state
    if (error || data.isError) {
      enqueueSnackbar('Error in importing reviews', { variant: 'error' });
      console.error('Error: Import Reviews', response);
    }
    // handle success state
    else if (data.success) {
      enqueueSnackbar('Successfully imported reviews');
      console.warn('Reviews Imported:', response);
      setValue('reviews', data?.results || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

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

WarehouseReviews.propTypes = Props;

export default WarehouseReviews;
