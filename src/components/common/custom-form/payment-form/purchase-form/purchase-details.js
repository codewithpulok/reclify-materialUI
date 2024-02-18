import { Card, Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { fCurrency, fNumber } from 'src/utils/format-number';

const Props = {
  /** @type {import('src/components/common/custom-dialog/purchase-payment-dialog').PurchaseData} */
  purchaseData: PropTypes.object,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchaseFormDetails = (props) => {
  const { purchaseData, sx = {} } = props;
  return (
    <Card component={Stack} sx={{ p: 1.5, borderRadius: 1, ...sx }} spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Selected Term (months): </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {purchaseData?.selectedTerm}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Price Per Pallet: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(purchaseData?.discountedPricePerPallet || purchaseData?.pricePerPallet)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Quantity of Pallet: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fNumber(purchaseData?.quantityOfPallet)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Monthly Total: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(purchaseData?.monthlyTotal)}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Stack>
          <Typography variant="subtitle2">1st Month Deposit Due: </Typography>
          <Typography variant="caption" color="text.secondary">
            *Remaining balance billed by warehouse in <br />
            accordance with their contract terms
          </Typography>
        </Stack>
        <Typography variant="subtitle2" color="text.primary">
          {fCurrency(purchaseData?.amountDue)}
        </Typography>
      </Stack>
    </Card>
  );
};

PurchaseFormDetails.propTypes = Props;

export default PurchaseFormDetails;
