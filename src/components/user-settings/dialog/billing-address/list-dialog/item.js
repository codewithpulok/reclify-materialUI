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
import { ICONS } from 'src/components/user-settings/config-user-settings';
import { getWarehouseAddress } from 'src/components/warehouse/utils';

const BillingAddressListItemProps = {
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
 * @param {BillingAddressListItemProps} props
 * @returns {JSX.Element}
 */
const BillingAddressListItem = (props) => {
  const { billingAddress, isSelected, onSelect, onDelete, onEdit } = props;
  const popover = usePopover();

  const handleEdit = useCallback(
    (e) => {
      onEdit(billingAddress);
      // prevent to pass click event to the parent
      e.stopPropagation();
    },
    [billingAddress, onEdit]
  );

  const handleDelete = useCallback(
    (e) => {
      onDelete(billingAddress);
      // prevent to pass click event to the parent
      e.stopPropagation();
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
          <Label color="primary">{billingAddress.addressType}</Label>
          {billingAddress.primary && <Label color="info">Default</Label>}
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {getWarehouseAddress(billingAddress.address)}
        </Typography>

        {billingAddress.phoneNumber && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {billingAddress.phoneNumber}
          </Typography>
        )}
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

BillingAddressListItem.propTypes = BillingAddressListItemProps;

export default BillingAddressListItem;
