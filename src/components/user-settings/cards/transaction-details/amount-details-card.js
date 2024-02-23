import PropTypes from 'prop-types';
// mui
import { Card, Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// utils
import { fCurrency, fNumber } from 'src/utils/format-number';
// redux
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

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
  const { user } = useAppSelector(selectAuth);

  const sellerContent =
    user?.userType === 'seller' && user?.serviceType === 'warehouse' ? (
      <>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
          <Typography variant="subtitle2">Transaction Fee (10%): </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {fCurrency((purchase?.amountDue || 0) / 10)}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
          <Typography variant="subtitle2">Warehouse Payment: </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {fCurrency(((purchase?.amountDue || 0) * 9) / 10)}
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          Disclaimer: <br />
          Deposit is a one-time transaction between the merchant and warehouse. Remaining balance is
          billed by warehouse in accordance to warehouse contract terms. Racklify is not responsible
          for billing or collecting future payments.
        </Typography>
      </>
    ) : null;

  return (
    <Card component={Stack} sx={{ mb: 1, p: 1.5, borderRadius: 1, ...sx }} spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Selected Term (months): </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {purchase?.selectedTerm || '-'}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Price Per Pallet: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(purchase?.discountedPricePerPallet || purchase?.pricePerPallet)}
        </Typography>
      </Stack>
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
        <Typography variant="subtitle2">Deposit Pending: </Typography>
        <Typography variant="subtitle2" color="text.primary">
          {fCurrency(purchase?.amountDue)}
        </Typography>
      </Stack>
      {sellerContent}
    </Card>
  );
};

AmountDetailsCard.propTypes = Props;

export default AmountDetailsCard;
