import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';

import { ListItemButton } from '@mui/material';
import CustomPopover, { usePopover } from 'src/components/common/custom-popover';
import Label from 'src/components/common/label';
import { ICONS } from '../../../config-user-settings';

const PaymentCardListItemProps = {
  /** @type {PaymentCard} */
  card: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  sx: PropTypes.object,
  /** @type {(paymentCard: PaymentCard) => {}} */
  onEdit: PropTypes.func.isRequired,
  /** @type {(paymentCard: PaymentCard) => {}} */
  onDelete: PropTypes.func.isRequired,
};
// ----------------------------------------------------------------------

/**
 * @param {PaymentCardListItemProps} props
 * @returns {JSX.Element}
 */
const PaymentCardListItem = (props) => {
  const { card, sx, onDelete, onEdit, isSelected, onSelect, ...other } = props;
  const popover = usePopover();

  const handleEdit = useCallback(() => {
    onEdit(card);
    popover.onClose();
  }, [card, onEdit, popover]);

  const handleDelete = useCallback(() => {
    onDelete(card);
    popover.onClose();
  }, [card, onDelete, popover]);

  const handleOpenPopover = useCallback(
    (e) => {
      popover.onOpen(e);
      e.stopPropagation();
    },
    [popover]
  );

  return (
    <>
      <Stack
        spacing={1}
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
        onClick={() => onSelect(card)}
        {...other}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {card.cardType === 'visa' ? ICONS.visacard() : ICONS.mastercard()}

          {card.primary && <Label color="info">Default</Label>}
        </Stack>

        <Typography variant="subtitle2">{card.cardNumber}</Typography>

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

PaymentCardListItem.propTypes = PaymentCardListItemProps;

export default PaymentCardListItem;
