import PropTypes from 'prop-types';
import { CustomerDetailsView } from 'src/sections/public/dashboard/users';

const CustomerDetailsPage = ({ params }) => <CustomerDetailsView id={params.id} />;

CustomerDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default CustomerDetailsPage;
