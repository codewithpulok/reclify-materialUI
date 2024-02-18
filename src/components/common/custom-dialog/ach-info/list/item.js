import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';

import { ListItemButton } from '@mui/material';
import CustomPopover, { usePopover } from 'src/components/common/custom-popover';
import Label from 'src/components/common/label';
import { ICONS } from '../../config-custom-dialog';

const ItemProps = {
  /** @type {ACHType} */
  ach: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  sx: PropTypes.object,
  /** @type {(ach: ACHType) => {}} */
  onEdit: PropTypes.func.isRequired,
  /** @type {(ach: ACHType) => {}} */
  onDelete: PropTypes.func.isRequired,
};
// ----------------------------------------------------------------------

/**
 * @param {ItemProps} props
 * @returns {JSX.Element}
 */
const Item = (props) => {
  const { ach, sx, onDelete, onEdit, isSelected, onSelect, ...other } = props;
  const popover = usePopover();

  const handleEdit = useCallback(() => {
    onEdit(ach);
    popover.onClose();
  }, [ach, onEdit, popover]);

  const handleDelete = useCallback(() => {
    onDelete(ach);
    popover.onClose();
  }, [ach, onDelete, popover]);

  const handleOpenPopover = useCallback(
    (e) => {
      popover.onOpen(e);
      // prevent to pass click event to the parent
      e.stopPropagation();
    },
    [popover]
  );

  return (
    <>
      <Stack
        spacing={0.2}
        component={ListItemButton}
        variant="outlined"
        sx={{
          alignItems: 'start',
          borderRadius: 1,

          position: 'relative',
          cursor: 'pointer',

          boxShadow: (theme) =>
            `0 0 0 1px ${isSelected ? theme.palette.info.dark : theme.palette.text.disabled}`,

          ...sx,
        }}
        onClick={() => onSelect(ach)}
        {...other}
      >
        <Stack mb={1.5} direction="row" alignItems="center" spacing={1}>
          {ach.isPrimary && <Label color="info">Primary</Label>}
        </Stack>

        <Typography variant="subtitle1">***********{ach?.last4}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {ach?.routingNumber}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {ach?.accountName}
        </Typography>

        <IconButton
          onClick={handleOpenPopover}
          sx={{
            top: 8,
            right: 8,
            position: 'absolute',
          }}
        >
          {ICONS.more()}
        </IconButton>
      </Stack>

      <CustomPopover open={popover.open} onClose={popover.onClose}>
        <MenuItem onClick={handleEdit}>
          {ICONS.edit()}
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          {ICONS.delete()}
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
};

Item.propTypes = ItemProps;

export default Item;
