import { notFound } from 'next/navigation';
import { getRegionByCode } from 'src/assets/data';
import { WarehousesRegionView } from 'src/sections/warehouses';

export const metadata = {
  title: 'Northeast Warehouses',
};

const WarehouseNortheastPage = async (props) => {
  const region = getRegionByCode('northeast');

  if (region === undefined) notFound();

  return <WarehousesRegionView region={region} />;
};

export default WarehouseNortheastPage;
