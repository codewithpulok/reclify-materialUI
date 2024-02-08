import {
  IconButton,
  ListItemButton,
  MenuItem,
  Stack,
  Typography,
  listItemButtonClasses,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import CustomPopover, { usePopover } from 'src/components/common/custom-popover';
import Label from 'src/components/common/label';
import { joinAddressObj } from 'src/utils/address';
import { ICONS } from '../../config-custom-dialog';

const Props = {
  /** @type {BillingAddress} */
  billingAddress: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  /** @type {(billingAddress: BillingAddress) => {}} */
  onEdit: PropTypes.func.isRequired,
  /** @type {(billingAddress: BillingAddress) => {}} */
  onDelete: PropTypes.func.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const Item = (props) => {
  const { billingAddress, isSelected, onSelect, onDelete, onEdit } = props;
  const popover = usePopover();

  const handleEdit = useCallback(
    (e) => {
      onEdit(billingAddress);
    },
    [billingAddress, onEdit]
  );

  const handleDelete = useCallback(
    (e) => {
      onDelete(billingAddress);
    },
    [billingAddress, onDelete]
  );

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
        spacing={0.5}
        component={ListItemButton}
        selected={isSelected}
        onClick={() => onSelect(billingAddress)}
        sx={{
          py: 1,
          px: 1.5,
          borderRadius: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          [`&.${listItemButtonClasses.selected}`]: {
            bgcolor: 'action.selected',
            '&:hover': {
              bgcolor: 'action.selected',
            },
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} width="100%">
          <Typography variant="subtitle2">{billingAddress.fullName}</Typography>

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

        <Stack className="actions" direction="row" spacing={0.5}>
          {billingAddress.isPrimary && <Label color="info">Primary</Label>}
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {billingAddress.email}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {billingAddress.phoneNumber}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {joinAddressObj(billingAddress.address)}
        </Typography>
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

Item.propTypes = Props;

export default Item;
