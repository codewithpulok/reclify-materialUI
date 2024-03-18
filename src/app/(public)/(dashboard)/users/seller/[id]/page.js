import PropTypes from 'prop-types';
import { SellerDetailsView } from 'src/sections/public/dashboard/users';

const SellerDetailsPage = ({ params }) => <SellerDetailsView id={params.id} />;

SellerDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default SellerDetailsPage;
