import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import { getRegionByCode } from 'src/assets/data';
import { WarehousesRegionView } from 'src/sections/private/dashboard/warehouses';

export const metadata = {
  title: 'Region Warehouses',
};

const WarehouseMidwestPage = async ({ params }) => {
  const region = getRegionByCode(params?.id);

  if (region === undefined) notFound();

  return <WarehousesRegionView region={region} />;
};

WarehouseMidwestPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default WarehouseMidwestPage;
