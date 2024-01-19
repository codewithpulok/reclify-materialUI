'use client';

import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
// local component
import { warehouses } from 'src/assets/dummy';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { useLazyWarehouseQuery } from 'src/redux-toolkit/services/warehouseApi';
import Content from './content';

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
    // ******** THIS IS FOR TEST PERPOSE ************* // TODO: Remove this
    if (!result.isLoading && id === 'test') {
      return <Content warehouse={warehouses[0]} />;
    }

    // if error occured
    if ((result.isError || result.data?.isError) && !id.isLoading) return <ErrorState />;

    // if there is no warehouse then show error
    if (result.data?.statusCode === 404) notFound();

    // on request success
    if (result.isSuccess && result.data?.isSuccess) {
      return <Content sourceWarehouse={result.data?.results} />;
    }

    return <LoadingScreen />;
  }

  return <Content sourceWarehouse={undefined} />;
};

WarehouseCreateView.propTypes = Props;

export default WarehouseCreateView;
