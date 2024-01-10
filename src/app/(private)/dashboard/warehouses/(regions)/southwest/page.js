import { notFound } from 'next/navigation';
import { getRegionByCode } from 'src/assets/data';
import { WarehousesRegionView } from 'src/sections/warehouses';

export const metadata = {
  title: 'Southwest Warehouses',
};

const WarehouseSouthwestPage = async (props) => {
  const region = getRegionByCode('southwest');

  if (region === undefined) notFound();

  return <WarehousesRegionView region={region} />;
};

export default WarehouseSouthwestPage;
