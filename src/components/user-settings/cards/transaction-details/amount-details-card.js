import { Card, Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { fCurrency, fNumber } from 'src/utils/format-number';

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
        <Typography variant="subtitle2">Selected Term (months): </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {purchase?.selectedTerm || '-'}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Price Per Pallet: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(purchase?.pricePerPallet)}
        </Typography>
      </Stack>
      {!!purchase?.discountedPricePerPallet && (
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
          <Typography variant="subtitle2">Discounted Price Per Pallet: </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {fCurrency(purchase?.discountedPricePerPallet)}
          </Typography>
        </Stack>
      )}
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Quantity of Pallet: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fNumber(purchase?.quantityOfPallet)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Monthly Total: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(purchase?.monthlyTotal)}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Amount Due: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(purchase?.amountDue)}
        </Typography>
      </Stack>
    </Card>
  );
};

AmountDetailsCard.propTypes = Props;

export default AmountDetailsCard;
