import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { fCurrency, fNumber } from 'src/utils/format-number';

const Props = {
  pricePerSpace: PropTypes.number,
  totalSpace: PropTypes.number,
  totalPrice: PropTypes.number,
  fee: PropTypes.number,
  due: PropTypes.number,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PurchaseFormDetails = (props) => {
  const { pricePerSpace, totalPrice, totalSpace, due, fee, sx = {} } = props;
  return (
    <Card component={Stack} sx={{ p: 1.5, borderRadius: 1, ...sx }} spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Total Pallet:</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fNumber(totalSpace)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Price Per Pallet: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(pricePerSpace)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Racklify Fee: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(fee)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Amount Due: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(due)}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        spacing={1}
        sx={{
          borderTopWidth: 2,
          borderTopColor: 'text.disabled',
          borderTopStyle: 'dashed',
          pt: 1,
          mt: 0.5,
        }}
      >
        <Typography variant="subtitle2">Total: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(totalPrice)}
        </Typography>
      </Stack>
    </Card>
  );
};

PurchaseFormDetails.propTypes = Props;

export default PurchaseFormDetails;
