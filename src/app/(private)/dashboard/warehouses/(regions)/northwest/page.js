import { notFound } from 'next/navigation';
import { getRegionByCode } from 'src/assets/data';
import { WarehousesRegionView } from 'src/sections/warehouses';

export const metadata = {
  title: 'Northwest Warehouses',
};

const WarehouseNorthwestPage = async (props) => {
  const region = getRegionByCode('northwest');

  if (region === undefined) notFound();

  return <WarehousesRegionView region={region} />;
};

export default WarehouseNorthwestPage;
