'use client';

import { IconButton, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import CustomPopover, { usePopover } from 'src/components/common/custom-popover';
import { ICONS } from '../../config';

/**
 * @param {CardActions.propTypes} props
 * @returns {JSX.Element}
 */
const CardActions = (props) => {
  const { onDelete, onEdit } = props;
  const popover = usePopover();

  // actions
  const handleDelete = () => {
    popover.onClose();
    onDelete();
  };

  const handleEdit = () => {
    popover.onClose();
    onEdit();
  };

  // components
  const renderBtn = (onDelete || onEdit) && (
    <IconButton
      onClick={popover.onOpen}
      sx={{ opacity: { xs: 1, lg: 0 } }}
      className="review-menu-btn"
    >
      {ICONS.menu()}
    </IconButton>
  );

  const renderMenu = (
    <CustomPopover open={popover.open} onClose={popover.onClose} arrow="top-right">
      {onEdit && <MenuItem onClick={handleEdit}>Edit Review</MenuItem>}
      {onDelete && <MenuItem onClick={handleDelete}>Delete Review</MenuItem>}
    </CustomPopover>
  );

  return (
    <>
      {renderBtn}
      {renderMenu}
    </>
  );
};

CardActions.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CardActions;
