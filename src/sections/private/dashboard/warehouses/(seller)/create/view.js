'use client';

import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
// local component
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { useLazyWarehouseQuery } from 'src/redux-toolkit/services/warehouseApi';
import WarehouseCreateContent from './content';

const Props = {
  id: PropTypes.string,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseCreateView = (props) => {
  const { id } = props;
  const [getWarehouse, result] = useLazyWarehouseQuery();

  useEffect(() => {
    if (id !== undefined) getWarehouse(id);
  }, [getWarehouse, id]);

  if (id !== undefined) {
    // if error occured
    if ((result.isError || result.data?.isError) && !id.isLoading) return <ErrorState />;

    // if there is no warehouse then show error
    if (result.data?.statusCode === 404) notFound();

    // on request success
    if (result.isSuccess && result.data?.success) {
      return <WarehouseCreateContent sourceWarehouse={result.data?.results} />;
    }

    return <LoadingScreen />;
  }

  return <WarehouseCreateContent sourceWarehouse={undefined} />;
};

WarehouseCreateView.propTypes = Props;

export default WarehouseCreateView;
