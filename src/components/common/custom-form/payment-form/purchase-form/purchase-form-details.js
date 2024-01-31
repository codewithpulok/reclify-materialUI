import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { fCurrency, fNumber } from 'src/utils/format-number';

const Props = {
  pricePerMonth: PropTypes.number,
  totalSpace: PropTypes.number,
  totalPrice: PropTypes.number,
  due: PropTypes.number,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchaseFormDetails = (props) => {
  const { pricePerMonth, totalPrice, totalSpace, due, sx = {} } = props;
  return (
    <Card component={Stack} sx={{ p: 1.5, borderRadius: 1, ...sx }} spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Total Pallet:</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fNumber(totalSpace)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Price Per Month: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(pricePerMonth)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Amount Due: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(due)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Total Price: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(totalPrice)}
        </Typography>
      </Stack>
    </Card>
  );
};

PurchaseFormDetails.propTypes = Props;

export default PurchaseFormDetails;
