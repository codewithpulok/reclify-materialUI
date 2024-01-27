import { notFound } from 'next/navigation';
import { getRegionByCode } from 'src/assets/data';
import { WarehousesRegionView } from 'src/sections/warehouses';

export const metadata = {
  title: 'Region Warehouses',
};

const WarehouseMidwestPage = async (props) => {
  const region = getRegionByCode(props.params?.id);

  if (region === undefined) notFound();

  return <WarehousesRegionView region={region} />;
};

export default WarehouseMidwestPage;
