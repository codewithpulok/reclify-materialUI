'use client';

import { notFound } from 'next/navigation';
import { getWarehouseReviews } from 'src/assets/dummy/reviews';
import { warehouses } from 'src/assets/dummy/warehouses';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { useWarehouseQuery } from 'src/redux-toolkit/services/warehouseApi';
import { WarehousesDetailsView } from 'src/sections/warehouses';

export const getWarehouse = async (id) => {
  // handle api calling
  const response = warehouses.find((w) => w.id === id);

  return response;
};

export default async function WarehouseDetailsPage({ params }) {
  const warehouseResult = useWarehouseQuery(params.id);
  const warehouseReviews = await getWarehouseReviews(params.id);

  console.log(warehouseResult);

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
