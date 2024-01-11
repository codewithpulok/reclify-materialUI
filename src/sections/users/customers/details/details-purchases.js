import { Card, CardContent, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import DetailsPurchaseHistory from './details-purchases-history';

const Props = {
  /** @type {Transaction[]} */
  transactions: PropTypes.arrayOf(PropTypes.object),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsPurchases = (props) => {
  const { transactions = [] } = props;
  return (
    <Card>
      <CardHeader title="Purchase History" />
      <CardContent>
        <DetailsPurchaseHistory transactions={transactions} />
      </CardContent>
    </Card>
  );
};

DetailsPurchases.propTypes = Props;

export default DetailsPurchases;
