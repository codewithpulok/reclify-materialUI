import { notFound } from 'next/navigation';
import { WarehousesEditView } from 'src/sections/warehouses';
import { getWarehouse } from '../../../[id]/page';

export const metadata = {
  title: 'Warehouse: Edit',
};

const WarehouseEditPage = async ({ params }) => {
  const warehouse = await getWarehouse(params.id);

  // if there is no warehouse then show error
  if (warehouse === undefined) notFound();

  return <WarehousesEditView warehouse={warehouse} />;
};

export default WarehouseEditPage;
