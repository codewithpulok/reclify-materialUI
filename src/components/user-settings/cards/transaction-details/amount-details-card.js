import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { fCurrency, fNumber } from 'src/utils/format-number';

const AmountDetailsCardProps = {
  pricePerSquare: PropTypes.number.isRequired,
  totalArea: PropTypes.number.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {AmountDetailsCardProps} props
 * @returns {JSX.Element}
 */
const AmountDetailsCard = (props) => {
  const { pricePerSquare, totalArea, sx = {} } = props;
  return (
    <Stack sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 1, ...sx }} spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Puchased Area:</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fNumber(totalArea)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
        <Typography variant="subtitle2">Price Per Square: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(pricePerSquare)}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        spacing={1}
        sx={{
          borderTopWidth: 2,
          borderTopColor: 'background.paper',
          borderTopStyle: 'dashed',
          pt: 1,
          mt: 0.5,
        }}
      >
        <Typography variant="subtitle2">Total: </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {fCurrency(totalArea * pricePerSquare)}
        </Typography>
      </Stack>
    </Stack>
  );
};

AmountDetailsCard.propTypes = AmountDetailsCardProps;

export default AmountDetailsCard;
