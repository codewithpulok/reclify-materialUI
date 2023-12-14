import { Avatar, Box, Rating, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { fToNow } from 'src/utils/format-time';

const WarehouseReviewCardProps = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  feedback: PropTypes.string,
};

/**
 * Warehouse Review Card
 * @param {WarehouseReviewCardProps} props
 * @returns {JSX.Element}
 */
const WarehouseReviewCard = (props) => {
  const { avatar, name, createdAt, rating, feedback } = props;
  const { palette } = useTheme();
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <Avatar alt={name} src={avatar} sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {name}
          </Typography>
          <Stack direction="row" alignItems="center" columnGap={1.5} flexWrap="wrap">
            <Rating value={rating} size="small" readOnly />
            <Typography variant="body2" color={palette.grey[600]}>
              ({fToNow(createdAt)})
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Typography variant="body2">{feedback}</Typography>
    </Box>
  );
};

WarehouseReviewCard.propTypes = WarehouseReviewCardProps;

export default WarehouseReviewCard;
