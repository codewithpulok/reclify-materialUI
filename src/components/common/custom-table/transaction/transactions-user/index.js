'use client';

import PropTypes from 'prop-types';
import TransactionTable from '../common/transaction-table';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'warehouse', label: 'Warehouse' },
  { id: 'invoice', label: 'Invoice' },
  { id: 'seller', label: 'Seller' },
  { id: 'customer', label: 'Merchant' },
  { id: 'createdAt', label: 'Date', width: 140 },
  { id: 'price', label: 'Price', width: 140 },
  { id: 'status', label: 'Status', width: 110 },
  { id: 'actions', width: 30 },
];

const Props = {
  data: PropTypes.arrayOf(PropTypes.object),
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const TransactionsUser = (props) => {
  const { data } = props;

  return <TransactionTable data={data} tableHead={TABLE_HEAD} />;
};

// ----------------------------------------------------------------------

TransactionsUser.propTypes = Props;

export default TransactionsUser;
