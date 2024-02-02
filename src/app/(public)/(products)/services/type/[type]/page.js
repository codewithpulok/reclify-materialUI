import PropTypes from 'prop-types';
import { getAvailableServiceTypes, getServiceType } from 'src/constant/service-types';
import { ServicesTypeListingView } from 'src/sections/public/products/services';

export const generateStaticParams = async () =>
  getAvailableServiceTypes().map((service) => ({
    type: service.value,
  }));

export const generateMetadata = async ({ params }) => {
  const service = getServiceType(params.type);

  return {
    title: `${service.label} Services - Racklify`,
  };
};

const Props = {
  params: {
    type: PropTypes.string,
  },
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServicesByTypePage = (props) => {
  const { params } = props;

  return <ServicesTypeListingView serviceType={params.type} />;
};

ServicesByTypePage.propTypes = Props;

export default ServicesByTypePage;
