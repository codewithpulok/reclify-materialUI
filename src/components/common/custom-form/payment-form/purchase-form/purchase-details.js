import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { fCurrency } from 'src/utils/format-number';

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
  const { purchaseData = {}, sx = {} } = props;
  return (
    <Card component={Stack} sx={{ p: 1.5, borderRadius: 1, ...sx }} spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Selected Month: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {purchaseData?.selectedMonth}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Total Price: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency((purchaseData?.totalPrice || 0) - (purchaseData?.discount || 0))}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Price Per Month: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(
            (purchaseData?.totalPricePerMonth || 0) - (purchaseData?.discountPerMonth || 0)
          )}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Amount Due: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(
            (purchaseData?.totalPricePerMonth || 0) - (purchaseData?.discountPerMonth || 0)
          )}
        </Typography>
      </Stack>
    </Card>
  );
};

PurchaseFormDetails.propTypes = Props;

export default PurchaseFormDetails;
