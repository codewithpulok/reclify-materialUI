import { notFound } from 'next/navigation';
import { warehouses } from 'src/assets/dummy/warehouses';
import Warehouse from 'src/sections/warehouse/view';

export const metadata = {
  title: 'warehouse: Details',
};

const getWarehouse = async (id) => {
  // handle api calling
  const warehouse = warehouses.find((w) => w.id === id);

  return warehouse;
};

export default async function WarehouseDetails({ params }) {
  const warehouse = await getWarehouse(params.id);

  // if there is no warehouse then show error
  if (warehouse === undefined) notFound();

  return <Warehouse warehouse={warehouse} />;
}
