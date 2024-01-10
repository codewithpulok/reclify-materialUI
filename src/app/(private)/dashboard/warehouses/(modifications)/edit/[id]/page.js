'use client';

import { notFound } from 'next/navigation';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { useWarehouseQuery } from 'src/redux-toolkit/services/warehouseApi';
import { WarehousesEditView } from 'src/sections/warehouses';
import { getWarehouse } from '../../../[id]/page';

const WarehouseEditPage = async ({ params }) => {
  const warehouseResult = useWarehouseQuery(params.id);

  // ******** THIS IS FOR TEST PERPOSE ************* // TODO: Remove this
  if (!warehouseResult.isLoading && params.id === 'test') {
    const testWarehouse = await getWarehouse(params.id);
    return <WarehousesEditView warehouse={testWarehouse} />;
  }

  // if error occured
  if ((warehouseResult.isError || warehouseResult.data?.isError) && !warehouseResult.isLoading)
    return <ErrorState />;

  // if there is no warehouse then show error
  if (warehouseResult.data?.statusCode === 404) notFound();

  // on request success
  if (warehouseResult.isSuccess && warehouseResult.data?.isSuccess) {
    return <WarehousesEditView warehouse={warehouseResult.data?.results} />;
  }

  return <LoadingScreen />;
};

export default WarehouseEditPage;
