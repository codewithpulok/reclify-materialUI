import PropTypes from 'prop-types';
import SellerTransactions from 'src/sections/users/sellers/details/details-transactions';
import AllTransactions from './all-transactions';
import CustomerTransactions from './customer-transactions';

const Props = {
  /** @type {UserType} */
  role: PropTypes.string,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SettingsTransactions = (props) => {
  const { role } = props;
  return (
    <>
      {role === 'customer' && <CustomerTransactions />}
      {role === 'seller' && <SellerTransactions />}
      {role === 'admin' && <AllTransactions />}
    </>
  );
};

SettingsTransactions.propTypes = Props;

export default SettingsTransactions;
