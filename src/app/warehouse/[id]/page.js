import { notFound } from 'next/navigation';
import { reviews } from 'src/assets/dummy/reviews';
import { warehouses } from 'src/assets/dummy/warehouses';
import { WarehouseDetails } from 'src/sections/warehouse/';

export const getWarehouse = async (id) => {
  // handle api calling
  const response = warehouses.find((w) => w.id === id);

  return response;
};

export const getWarehouseReviews = async (id) => {
  // handle api calling
  const response = reviews.filter((r) => r.warehouseId === id);

  return response;
};

export const generateMetadata = async ({ params }) => {
  const warehouse = await getWarehouse(params.id);

  if (!warehouse) return {};

  return {
    title: warehouse.name,
  };
};

export default async function WarehouseDetailsPage({ params }) {
  const warehouse = await getWarehouse(params.id);
  const warehouseReviews = await getWarehouseReviews(params.id);

  // if there is no warehouse then show error
  if (warehouse === undefined) notFound();

  return <WarehouseDetails warehouse={warehouse} reviews={warehouseReviews} />;
}
