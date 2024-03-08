'use client';

import { Button, MenuItem, Pagination, Select, Stack, SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
// local components
import { EmptyState } from 'src/components/common/custom-state';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';
import { WarehouseReviewCard } from 'src/components/warehouse/cards';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDialog } from 'src/hooks/use-dialog';
import usePagination from 'src/hooks/use-pagination';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { ICONS } from '../../../../../sections/private/dashboard/warehouses/config-warehouse';
import ReviewCreate from './review-create';
import ReviewDelete from './review-delete';
import ReviewEdit from './review-edit';

const Props = {
  /** @type {Review[]} */
  reviews: PropTypes.arrayOf(PropTypes.object),
  warehouseId: PropTypes.string,
  canAddNewReview: PropTypes.bool.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * List of warehouse reviews
 * @param {Props} props
 * @returns {React.JSX.Element}
 */
const DetailsReviews = (props) => {
  const { reviews, sx, canAddNewReview, warehouseId } = props;
  const [sortType, setSortType] = useState('DEFAULT'); // NEW_FIRST, OLD_FIRST, DEFAULT
  const auth = useAppSelector(selectAuth);

  // dialog state
  const createDialog = useBoolean(false);
  const editDialog = useDialog();
  const deleteDialog = useDialog();

  const sortedReviews = useMemo(
    () =>
      reviews
        ? [...reviews].sort((a, b) => {
            const timestampA = a.createdAt;
            const timestampB = b.createdAt;

            if (sortType === 'NEW_FIRST') return timestampB - timestampA;

            if (sortType === 'OLD_FIRST') return timestampA - timestampB;

            // Default sorting: newest first
            return 0;
          })
        : [],
    [reviews, sortType]
  );

  // paginated state
  const { currentData, currentPage, goTo, totalPages } = usePagination(sortedReviews, 5);

  return (
    <>
      <WarehouseDetailsBox
        title="Reviews"
        sx={{ scrollMarginTop: '40px', ...sx }}
        id="reviews"
        headerActions={
          <>
            <Select
              labelId="sortBy"
              id="demo-simple-select"
              value={sortType}
              size="small"
              startAdornment={<SvgIcon sx={{ fontSize: 20 }}>{ICONS.sort()}</SvgIcon>}
              onChange={(e) => setSortType(e.target.value)}
              sx={{ ml: 'auto' }}
            >
              <MenuItem disabled>Sort by</MenuItem>
              <MenuItem value="DEFAULT">Default</MenuItem>
              <MenuItem value="NEW_FIRST">Most Recent</MenuItem>
              <MenuItem value="OLD_FIRST">Most Old</MenuItem>
            </Select>

            {canAddNewReview && (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: {
                    xs: '100%',
                    sm: 'auto',
                  },
                }}
                onClick={createDialog.onTrue}
              >
                Add New
              </Button>
            )}
          </>
        }
      >
        {totalPages ? (
          <>
            <Stack spacing={3.5}>
              {currentData.map((review) => (
                <WarehouseReviewCard
                  key={review.id}
                  avatar={review.userData?.avatar}
                  createdAt={review?.createdAt}
                  feedback={review.feedback}
                  name={
                    review?.userData?.fullName ||
                    `${review.userData?.firstName} ${review.userData?.lastName}`
                  }
                  rating={review.rating}
                  showDeleteOption={
                    auth?.user?.userType === 'admin' || auth?.user?.id === review?.userData?.id
                  }
                  showEditOption={auth?.user?.id === review?.userData?.id}
                  onDelete={() => deleteDialog.onOpen(review)}
                  onEdit={() => editDialog.onOpen(review)}
                />
              ))}
            </Stack>

            {!!totalPages && (
              <Stack direction="row" justifyContent="center" mt={7} mb={2}>
                <Pagination
                  count={totalPages}
                  color="primary"
                  size="small"
                  page={currentPage}
                  onChange={(_e, page) => goTo(page)}
                />
              </Stack>
            )}
          </>
        ) : (
          <EmptyState icon={ICONS.review()} text="no reviews yet" />
        )}
      </WarehouseDetailsBox>

      <ReviewCreate
        warehouseId={warehouseId}
        open={createDialog.value}
        onClose={createDialog.onFalse}
      />
      <ReviewEdit
        warehouseId={warehouseId}
        open={editDialog.open}
        onClose={editDialog.onClose}
        review={editDialog.value}
      />
      <ReviewDelete
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
        review={deleteDialog.value}
      />
    </>
  );
};

DetailsReviews.propTypes = Props;

export default DetailsReviews;
