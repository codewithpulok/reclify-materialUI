'use client';

import PropTypes from 'prop-types';
// local components
import { notFound } from 'next/navigation';
import { services } from 'src/assets/dummy/services';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { ServiceDetails } from 'src/components/service/details';
import { useGetServiceQuery } from 'src/redux-toolkit/services/serviceApi';

const Props = {
  id: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
function DetailsView(props) {
  const { id } = props;
  const serviceResponse = useGetServiceQuery(id, { skip: id === 'test' });

  if (!serviceResponse.isLoading && id === 'test') {
    return <ServiceDetails service={services[0]} />;
  }

  // if error occured
  if ((serviceResponse.isError || serviceResponse.data?.isError) && !serviceResponse.isLoading)
    return <ErrorState />;

  // if there is no warehouse then show error
  if (serviceResponse.data?.statusCode === 404) notFound();

  // on request success
  if (serviceResponse.isSuccess && serviceResponse.data?.success) {
    return <ServiceDetails service={serviceResponse.data.results} />;
  }

  return <LoadingScreen />;
}

DetailsView.propTypes = Props;

export default DetailsView;
