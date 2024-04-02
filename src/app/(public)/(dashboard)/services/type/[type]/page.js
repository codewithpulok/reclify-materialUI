import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { getAvailableServiceTypes, getServiceType } from 'src/constant/service-types';
import { ServicesTypeListingView } from 'src/sections/public/dashboard/services';
import { getServices } from 'src/utils/api/server/services/service.api';

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

/**
 * @param {ServicesByTypePage.propTypes} props
 * @returns {JSX.Element}
 */
const ServicesByTypePage = async (props) => {
  const { params } = props;
  const response = await getServices();

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success)
    return <ServicesTypeListingView serviceType={params.type} services={response.results} />;

  return <Loading />;
};

ServicesByTypePage.propTypes = {
  params: {
    type: PropTypes.string,
  },
};

export default ServicesByTypePage;
