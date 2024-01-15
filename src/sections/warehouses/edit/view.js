'use client';

import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
// local component
import { warehouses } from 'src/assets/dummy';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { useWarehouseQuery } from 'src/redux-toolkit/services/warehouseApi';
import Content from './content';

const Props = {
  id: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseEditView = (props) => {
  const { id } = props;
  const warehouseResult = useWarehouseQuery(id);

  // ******** THIS IS FOR TEST PERPOSE ************* // TODO: Remove this
  if (!warehouseResult.isLoading && id === 'test') {
    return <Content warehouse={warehouses[0]} />;
  }

  // if error occured
  if ((warehouseResult.isError || warehouseResult.data?.isError) && !warehouseResult.isLoading)
    return <ErrorState />;

  // if there is no warehouse then show error
  if (warehouseResult.data?.statusCode === 404) notFound();

  // on request success
  if (warehouseResult.isSuccess && warehouseResult.data?.isSuccess) {
    return <Content warehouse={warehouseResult.data?.results} />;
  }

  return <LoadingScreen />;
};

WarehouseEditView.propTypes = Props;

export default WarehouseEditView;
