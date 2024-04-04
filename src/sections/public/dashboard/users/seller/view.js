import PropTypes from 'prop-types';
import { SellerPublicDetails } from 'src/components/users/details';

/**
 * @param {SellerDetailsView.propTypes} props
 * @returns {JSX.Element}
 */
const SellerDetailsView = (props) => {
  const { user } = props;

  return <SellerPublicDetails user={user} />;
};

SellerDetailsView.propTypes = {
  /** @type {User} */
  user: PropTypes.object.isRequired,
};

export default SellerDetailsView;
