'use client';

import PropTypes from 'prop-types';
// local components
import { notFound } from 'next/navigation';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { useWarehouseQuery } from 'src/redux-toolkit/services/warehouseApi';
import Content from './content';

const Props = {
  id: PropTypes.string.isRequired,
};

/**
 * Warehouse Details page component
 * @param {Props} props
 * @returns {JSX.Element}
 */
function DetailsView(props) {
  const { id } = props;
  const warehouseResult = useWarehouseQuery(id);

  // if error occured
  if ((warehouseResult.isError || warehouseResult.data?.isError) && !warehouseResult.isLoading)
    return <ErrorState />;

  // if there is no warehouse then show error
  if (warehouseResult.data?.statusCode === 404) notFound();

  // on request success
  if (warehouseResult.isSuccess && warehouseResult.data?.success) {
    return (
      <Content
        warehouse={warehouseResult.data?.results}
        reviews={warehouseResult.data?.results?.reviews || []}
      />
    );
  }

  return <LoadingScreen />;
}

DetailsView.propTypes = Props;

export default DetailsView;
