import PropTypes from 'prop-types';
import { CustomerPublicDetails } from 'src/components/users/details';

/**
 * @param {CustomerDetailsView.propTypes} props
 * @returns {JSX.Element}
 */
const CustomerDetailsView = (props) => {
  const { user } = props;

  return <CustomerPublicDetails user={user} />;
};

CustomerDetailsView.propTypes = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
};

export default CustomerDetailsView;
