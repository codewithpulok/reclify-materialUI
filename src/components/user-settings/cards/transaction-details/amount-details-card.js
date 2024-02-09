import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { fCurrency, fNumber } from 'src/utils/format-number';

/**
 * @typedef {Object} TransactionPurchase
 * @property {number} month
 * @property {number} pallet
 * @property {number} price
 * @property {number} total
 */

const Props = {
  /** @type {TransactionPurchase} */
  purchase: PropTypes.object,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AmountDetailsCard = (props) => {
  const { purchase, sx = {} } = props;
  return (
    <Card component={Stack} sx={{ p: 1.5, borderRadius: 1, ...sx }} spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Total Pallet:</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fNumber(purchase?.pallet)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Selected Month: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fNumber(purchase?.month)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Total Price:</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(purchase.total)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Price Per Month: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(purchase.price)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Amount Due: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(purchase.price)}
        </Typography>
      </Stack>
    </Card>
  );
};

AmountDetailsCard.propTypes = Props;

export default AmountDetailsCard;
