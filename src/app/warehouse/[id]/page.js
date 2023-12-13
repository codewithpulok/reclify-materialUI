import { notFound } from 'next/navigation';
import { warehouses } from 'src/assets/dummy/warehouses';
import { WarehouseDetails } from 'src/sections/warehouse/';

export const getWarehouse = async (id) => {
  // handle api calling
  const warehouse = warehouses.find((w) => w.id === id);

  return warehouse;
};

export const generateMetadata = async ({ params }) => {
  const warehouse = await getWarehouse(params.id);

  return {
    title: warehouse.name,
  };
};

export default async function WarehouseDetailsPage({ params }) {
  const warehouse = await getWarehouse(params.id);

  // if there is no warehouse then show error
  if (warehouse === undefined) notFound();

  return <WarehouseDetails warehouse={warehouse} />;
}
