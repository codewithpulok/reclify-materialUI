import { WarehousesCreateView } from 'src/sections/warehouses';
import { getWarehouse } from '../../[id]/page';

export const metadata = {
  title: 'Create Warehouse - Racklify',
};

const WarehouseCreatePage = async ({ searchParams }) => {
  const warehouse = searchParams?.clone ? await getWarehouse(searchParams?.clone) : undefined;

  if (warehouse) delete warehouse.id;

  return <WarehousesCreateView sourceWarehouse={warehouse} />;
};

export default WarehouseCreatePage;
