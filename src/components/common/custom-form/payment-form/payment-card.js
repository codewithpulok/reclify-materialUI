import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ListItemButton } from '@mui/material';
import { ICONS } from '../config-custom-form';

const PaymentCardProps = {
  /** @type {PaymentCard | undefined} */
  card: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
// ----------------------------------------------------------------------

/**
 * @param {PaymentCardProps} props
 * @returns {JSX.Element}
 */
const PaymentCard = (props) => {
  const { card, sx, onClick, ...other } = props;

  return (
    <Stack
      spacing={1}
      component={ListItemButton}
      variant="outlined"
      sx={{
        py: 1,
        px: 1.5,

        alignItems: 'start',
        borderRadius: 1,

        position: 'relative',
        cursor: 'pointer',

        boxShadow: (theme) => `0 0 0 1px ${theme.palette.text.disabled}`,

        ...sx,
      }}
      onClick={onClick}
      {...other}
    >
      <Stack width="100%" direction="row" alignItems="start" justifyContent="space-between">
        {card && (card.cardType === 'visa' ? ICONS.visacard() : ICONS.mastercard())}
        {!card && <Typography variant="subtitle2">Select Payment card</Typography>}

        {ICONS.dropdown()}
      </Stack>
      {card && <Typography variant="subtitle2">{card.cardNumber}</Typography>}
    </Stack>
  );
};

PaymentCard.propTypes = PaymentCardProps;

export default PaymentCard;
