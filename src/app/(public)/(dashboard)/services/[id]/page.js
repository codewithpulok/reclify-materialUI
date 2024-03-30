import PropTypes from 'prop-types';
import { ServicesDetailsView } from 'src/sections/public/dashboard/services';

export const metadata = {
  title: 'Service Details',
};

const Props = {
  params: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns
 */
const ServicesDetailsPage = ({ params }) => <ServicesDetailsView id={params.id} />;

ServicesDetailsPage.propTypes = Props;

export default ServicesDetailsPage;
