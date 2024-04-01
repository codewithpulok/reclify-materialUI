import PropTypes from 'prop-types';
import { ServicesDetailsView } from 'src/sections/private/dashboard/services';

export const metadata = {
  title: 'Service Details',
};

const ServicesDetailsPage = ({ params }) => <ServicesDetailsView id={params.id} />;

ServicesDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default ServicesDetailsPage;
