import { Avatar, Box, Rating, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { fDate } from 'src/utils/format-time';
import CardActions from './card-actions';

/**
 * Warehouse Review Card
 * @param {ReviewCard.propTypes} props
 * @returns {JSX.Element}
 */
const ReviewCard = (props) => {
  const {
    avatar,
    name,
    createdAt,
    rating,
    feedback,
    showDeleteOption,
    showEditOption,
    onDelete,
    onEdit,
  } = props;

  return (
    <Box
      sx={{
        ':hover  .review-menu-btn': {
          opacity: 1,
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={1} sx={{ width: '100%' }}>
        <Avatar alt={name} src={avatar} sx={{ width: 56, height: 56 }} />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body1" fontWeight="bold">
            {name}
          </Typography>
          <Stack direction="row" alignItems="center" columnGap={1.5} flexWrap="wrap">
            <Rating value={rating} size="small" readOnly />
            <Typography variant="body2" color="grey.600">
              ({fDate(createdAt) || 'not available'})
            </Typography>
          </Stack>
        </Box>
        <div>
          <CardActions
            onDelete={onDelete}
            onEdit={onEdit}
            showDeleteOption={showDeleteOption}
            showEditOption={showEditOption}
          />
        </div>
      </Stack>

      <Typography variant="body2">{feedback}</Typography>
    </Box>
  );
};

ReviewCard.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.number,
  rating: PropTypes.number.isRequired,
  feedback: PropTypes.string,
  showDeleteOption: PropTypes.bool.isRequired,
  showEditOption: PropTypes.bool.isRequired,

  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ReviewCard;
