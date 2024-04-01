import PropTypes from 'prop-types';
import { TransactionDetailsView } from 'src/sections/private/dashboard/transactions';

export const metadata = {
  title: 'Transaction Details',
};

const TransactionDetailsPage = ({ params }) => <TransactionDetailsView id={params.id} />;

TransactionDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default TransactionDetailsPage;
