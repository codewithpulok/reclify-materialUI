import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CustomPopover, { usePopover } from 'src/components/common/custom-popover';
import Label from 'src/components/common/label';
import { ICONS } from '../config-user-settings';

// ----------------------------------------------------------------------

const PaymentCard = ({ card, sx, ...other }) => {
  const popover = usePopover();

  return (
    <>
      <Stack
        spacing={1}
        component={Paper}
        variant="outlined"
        sx={{
          p: 2.5,
          width: 1,
          position: 'relative',
          ...sx,
        }}
        {...other}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {card.cardType === 'visa' ? ICONS.visacard() : ICONS.mastercard()}

          {card.primary && <Label color="info">Primary</Label>}
        </Stack>

        <Typography variant="subtitle2">{card.cardNumber}</Typography>

        <IconButton
          onClick={popover.onOpen}
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
        <MenuItem onClick={popover.onClose}>
          {ICONS.primary()}
          Set as primary
        </MenuItem>

        <MenuItem onClick={popover.onClose}>
          {ICONS.edit()}
          Edit
        </MenuItem>

        <MenuItem onClick={popover.onClose} sx={{ color: 'error.main' }}>
          {ICONS.delete()}
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
};

PaymentCard.propTypes = {
  card: PropTypes.object,
  sx: PropTypes.object,
};

export default PaymentCard;
