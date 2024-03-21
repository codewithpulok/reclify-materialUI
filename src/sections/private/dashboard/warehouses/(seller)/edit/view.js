'use client';

import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
// local component
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { useWarehouseQuery } from 'src/redux-toolkit/services/warehouseApi';
import WarehouseEditContent from './content';

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

  // if error occured
  if ((warehouseResult.isError || warehouseResult.data?.isError) && !warehouseResult.isLoading)
    return <ErrorState />;

  // if there is no warehouse then show error
  if (warehouseResult.data?.statusCode === 404) notFound();

  // on request success
  if (warehouseResult.isSuccess && warehouseResult.data?.success) {
    return <WarehouseEditContent warehouse={warehouseResult.data?.results} />;
  }

  return <LoadingScreen />;
};

WarehouseEditView.propTypes = Props;

export default WarehouseEditView;
