'use client';

import {
  Box,
  Button,
  MenuItem,
  Pagination,
  Select,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
// local components
import { EmptyState } from 'src/components/common/custom-state';
import { WarehouseReviewCard } from 'src/components/warehouse/cards';
import { useBoolean } from 'src/hooks/use-boolean';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { ICONS } from '../../config-warehouse';
import { detailsBoxStyle, detailsHeaderStyle } from '../../styles';
import ReviewCreate from './review-create';
import ReviewDelete from './review-delete';
import ReviewEdit from './review-edit';

const WarehouseReviewsProps = {
  /** @type {Review[]} */
  reviews: PropTypes.arrayOf(PropTypes.object),
  canAddNewReview: PropTypes.bool.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * List of warehouse reviews
 * @param {WarehouseReviewsProps} props
 * @returns {React.JSX.Element}
 */
const WarehouseReviews = (props) => {
  const { reviews, sx, canAddNewReview } = props;
  const [sortType, setSortType] = useState('DEFAULT'); // NEW_FIRST, OLD_FIRST, DEFAULT
  const auth = useAppSelector(selectAuth);

  const reviewAddModal = useBoolean(false);
  const [reviewEdit, setReviewEdit] = useState({ open: false, review: {} });
  const [reviewDelete, setReviewDelete] = useState({ open: false, review: {} });

  const openReviewEdit = (review) => {
    setReviewEdit({ open: true, review });
  };
  const closeReviewEdit = () => {
    setReviewEdit({ open: false, review: {} });
  };

  const openReviewDelete = (review) => {
    setReviewDelete({ open: true, review });
  };
  const closeReviewDelete = () => {
    setReviewDelete({ open: false, review: {} });
  };

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

  return (
    <Box
      sx={{
        ...sx,
        ...detailsBoxStyle,
      }}
    >
      <Stack
        flexWrap="wrap"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        mb={5}
      >
        <Typography variant="h5" sx={detailsHeaderStyle} mr="auto">
          Reviews
        </Typography>

        <Select
          labelId="sortBy"
          id="demo-simple-select"
          value={sortType}
          size="small"
          startAdornment={<SvgIcon sx={{ fontSize: 20 }}>{ICONS.sort()}</SvgIcon>}
          onChange={(e) => setSortType(e.target.value)}
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
            onClick={reviewAddModal.onTrue}
          >
            Add New
          </Button>
        )}
      </Stack>

      {sortedReviews?.length ? (
        <>
          <Stack spacing={3.5}>
            {sortedReviews.map((review) => (
              <WarehouseReviewCard
                key={review.id}
                avatar={review.author.photoURL}
                createdAt={review.createdAt}
                feedback={review.feedback}
                name={review.author.displayName}
                rating={review.rating}
                showDeleteOption={
                  auth?.user?.userType === 'admin' || auth?.user?.id === review?.authorId
                }
                showEditOption={auth?.user?.id === review?.authorId}
                onDelete={() => openReviewDelete(review)}
                onEdit={() => openReviewEdit(review)}
              />
            ))}
          </Stack>

          <Stack direction="row" justifyContent="center" mt={5} mb={1}>
            <Pagination count={10} color="primary" size="small" />
          </Stack>
        </>
      ) : (
        <EmptyState icon={ICONS.review()} text="no reviews yet" />
      )}

      <ReviewCreate open={reviewAddModal.value} onClose={reviewAddModal.onFalse} />
      <ReviewEdit open={reviewEdit.open} onClose={closeReviewEdit} review={reviewEdit.review} />
      <ReviewDelete
        open={reviewDelete.open}
        onClose={closeReviewDelete}
        review={reviewDelete.review}
      />
    </Box>
  );
};

WarehouseReviews.propTypes = WarehouseReviewsProps;

export default WarehouseReviews;
