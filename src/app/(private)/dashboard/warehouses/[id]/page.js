'use client';

import { notFound } from 'next/navigation';
import { getWarehouseReviews } from 'src/assets/dummy/reviews';
import { getWarehouseById } from 'src/assets/dummy/warehouses';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { useWarehouseQuery } from 'src/redux-toolkit/services/warehouseApi';
import { WarehousesDetailsView } from 'src/sections/warehouses';

export const getWarehouse = async (id) => {
  // handle api calling
  const response = getWarehouseById(id);

  return response;
};

export default async function WarehouseDetailsPage({ params }) {
  const warehouseResult = useWarehouseQuery(params.id);
  const warehouseReviews = await getWarehouseReviews(params.id);

  // ******** THIS IS FOR TEST PERPOSE ************* // TODO: Remove this
  if (!warehouseResult.isLoading && params.id === 'test') {
    const testWarehouse = await getWarehouse(params.id);
    return <WarehousesDetailsView warehouse={testWarehouse} reviews={warehouseReviews} />;
  }

  // if error occured
  if ((warehouseResult.isError || warehouseResult.data?.isError) && !warehouseResult.isLoading)
    return <ErrorState />;

  // if there is no warehouse then show error
  if (warehouseResult.data?.statusCode === 404) notFound();

  // on request success
  if (warehouseResult.isSuccess && warehouseResult.data?.isSuccess) {
    return (
      <WarehousesDetailsView warehouse={warehouseResult.data?.results} reviews={warehouseReviews} />
    );
  }

  return <LoadingScreen />;
}
