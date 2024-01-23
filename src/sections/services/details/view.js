'use client';

import PropTypes from 'prop-types';
// local components
import { notFound } from 'next/navigation';
import { useMemo } from 'react';
import { getServiceById } from 'src/assets/dummy/services';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { ServiceDetails } from 'src/components/service/details';

const Props = {
  id: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
function DetailsView(props) {
  const { id } = props;
  const result = useMemo(
    () => ({
      data: { results: getServiceById(id), isSuccess: true },
      isSuccess: true,
      isLoading: false,
    }),
    [id]
  );

  // if error occured
  if ((result.isError || result.data?.isError) && !result.isLoading) return <ErrorState />;

  // if there is no warehouse then show error
  if (result.data?.statusCode === 404) notFound();

  // on request success
  if (result.isSuccess && result.data?.isSuccess) {
    return <ServiceDetails service={result.data.results} />;
  }

  return <LoadingScreen />;
}

DetailsView.propTypes = Props;

export default DetailsView;
