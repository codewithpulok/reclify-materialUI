import { WarehouseCreateView } from 'src/sections/warehouse';
import { getWarehouse } from '../[id]/page';

export const metadata = {
  title: 'Create Warehouse - Racklify',
};

const WarehouseCreatePage = async ({ searchParams }) => {
  const warehouse = searchParams?.clone ? await getWarehouse(searchParams?.clone) : undefined;

  if (warehouse) delete warehouse.id;

  return <WarehouseCreateView sourceWarehouse={warehouse} />;
};

export default WarehouseCreatePage;
