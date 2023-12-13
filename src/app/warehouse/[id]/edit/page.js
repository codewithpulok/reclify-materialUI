import { notFound } from 'next/navigation';
import { WarehouseEdit } from 'src/sections/warehouse';
import { getWarehouse } from '../page';

const WarehouseEditPage = async ({ params }) => {
  const warehouse = await getWarehouse(params.id);

  // if there is no warehouse then show error
  if (warehouse === undefined) notFound();

  return <WarehouseEdit warehouse={warehouse} />;
};

export default WarehouseEditPage;
