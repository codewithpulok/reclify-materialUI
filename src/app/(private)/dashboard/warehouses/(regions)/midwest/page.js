import { notFound } from 'next/navigation';
import { getRegionByCode } from 'src/assets/data';
import { WarehousesRegionView } from 'src/sections/warehouses';

export const metadata = {
  title: 'Midwest Warehouses',
};

const WarehouseMidwestPage = async (props) => {
  const region = getRegionByCode('midwest');

  if (region === undefined) notFound();

  return <WarehousesRegionView region={region} />;
};

export default WarehouseMidwestPage;
