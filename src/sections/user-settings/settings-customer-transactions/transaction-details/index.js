import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import TransactionAmount from './transaction-amount';
import TransactionUser from './transaction-user';
import TransactionWarehouse from './transaction-warehouse';

const TransactionDetailsProps = {
  /** @type {CustomerTransaction} */
  transaction: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {TransactionDetailsProps} props
 * @returns {JSX.Element}
 */
const TransactionDetails = (props) => {
  const { transaction, sx = {} } = props;

  return (
    <Stack sx={sx} spacing={1.5}>
      <TransactionWarehouse warehouse={transaction.warehouse} />

      <TransactionUser user={transaction.seller} />

      <TransactionAmount pricePerSquare={200} totalArea={20} />
    </Stack>
  );
};

TransactionDetails.propTypes = TransactionDetailsProps;

export default TransactionDetails;
