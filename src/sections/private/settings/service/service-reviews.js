import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { EmptyState } from 'src/components/common/custom-state';
import { RHFAccordion } from 'src/components/common/hook-form';
import { WarehouseReviewCard } from 'src/components/warehouse/cards';
import { ICONS } from '../config-settings';

const Props = { list: PropTypes.arrayOf(PropTypes.object) };

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceReviews = (props) => {
  const { list = [] } = props;
  return (
    <RHFAccordion label="Reviews" defaultExpanded name="reviews" sx={{ width: 1 }}>
      {list?.length ? (
        <Stack spacing={3.5}>
          {list.map((review) => (
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
  );
};

ServiceReviews.propTypes = Props;

export default ServiceReviews;
