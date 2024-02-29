import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { EmptyState } from 'src/components/common/custom-state';
import { RHFAccordion } from 'src/components/common/hook-form';
import { WarehouseReviewCard } from 'src/components/warehouse/cards';
import { useLazyAddressGoogleReviewsQuery } from 'src/redux-toolkit/services/addressApi';
import { checkValidAddress, joinAddressObj } from 'src/utils/address';
import { ICONS } from '../../config-warehouse';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseReviews = (props) => {
  // api state
  const [getReviews, reviewsResponse] = useLazyAddressGoogleReviewsQuery();

  // form state
  const { watch } = useFormContext();
  const address = watch('address');
  const reviews = watch('reviews', []);

  // conditional state
  const isImportable = checkValidAddress(address);

  // fetch reviews
  const getReviewsHandler = useCallback(async () => {
    const response = await getReviews(joinAddressObj(address));
    console.log(response);
  }, [address, getReviews]);

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
        Import Reviews
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
