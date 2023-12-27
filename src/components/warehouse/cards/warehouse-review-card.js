import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import { fToNow } from 'src/utils/format-time';
import { ICONS } from '../config-warehouse';

const WarehouseReviewCardProps = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  feedback: PropTypes.string,
  showDeleteOption: PropTypes.bool.isRequired,
  showEditOption: PropTypes.bool.isRequired,
};

/**
 * Warehouse Review Card
 * @param {WarehouseReviewCardProps} props
 * @returns {JSX.Element}
 */
const WarehouseReviewCard = (props) => {
  const { avatar, name, createdAt, rating, feedback, showDeleteOption, showEditOption } = props;
  const { palette } = useTheme();

  const menu = useBoolean();
  const menuRef = useRef();

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
            <Typography variant="body2" color={palette.grey[600]}>
              ({fToNow(createdAt)})
            </Typography>
          </Stack>
        </Box>
        <div>
          {showDeleteOption || showEditOption ? (
            <IconButton
              ref={menuRef}
              onClick={menu.onToggle}
              sx={{ opacity: 0 }}
              className="review-menu-btn"
            >
              {ICONS.menu()}
            </IconButton>
          ) : null}
          <Menu
            id="basic-menu"
            anchorEl={menuRef.current}
            open={menu.value}
            onClose={menu.onFalse}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {showEditOption && <MenuItem onClick={menu.onFalse}>Edit</MenuItem>}
            {showDeleteOption && <MenuItem onClick={menu.onFalse}>Delete Review</MenuItem>}
          </Menu>
        </div>
      </Stack>

      <Typography variant="body2">{feedback}</Typography>
    </Box>
  );
};

WarehouseReviewCard.propTypes = WarehouseReviewCardProps;

export default WarehouseReviewCard;
