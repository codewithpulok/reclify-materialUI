import { notFound } from 'next/navigation';
import { getRegionByCode } from 'src/assets/data';
import { WarehousesRegionView } from 'src/sections/warehouses';

export const metadata = {
  title: 'Southeast Warehouses',
};

const WarehouseSoutheastPage = async (props) => {
  const region = getRegionByCode('southeast');

  if (region === undefined) notFound();

  return <WarehousesRegionView region={region} />;
};

export default WarehouseSoutheastPage;
